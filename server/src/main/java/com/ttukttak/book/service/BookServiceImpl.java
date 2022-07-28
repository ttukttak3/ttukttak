package com.ttukttak.book.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.address.entity.HomeTown;
import com.ttukttak.address.entity.HomeTown.UseStatusType;
import com.ttukttak.address.entity.Town;
import com.ttukttak.address.repository.HomeTownRepository;
import com.ttukttak.address.service.AddressService;
import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookDetailResponse;
import com.ttukttak.book.dto.BookDto;
import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.book.dto.BookRequest;
import com.ttukttak.book.dto.BookResponse;
import com.ttukttak.book.dto.BookUploadRequest;
import com.ttukttak.book.dto.MyBookResponse;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookGrade;
import com.ttukttak.book.entity.Book.BookStatus;
import com.ttukttak.book.entity.BookCategory;
import com.ttukttak.book.entity.BookImage;
import com.ttukttak.book.entity.BookInfo;
import com.ttukttak.book.repository.BookCategoryRepositroy;
import com.ttukttak.book.repository.BookImageRepository;
import com.ttukttak.book.repository.BookInfoRepository;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.common.StorageUploader;
import com.ttukttak.common.dto.FileUploadResponse;
import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.service.UserService;
import com.ttukttak.rent.entity.Rent;
import com.ttukttak.rent.repository.RentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {
	private final BookCategoryRepositroy bookCategoryRepositroy;
	private final BookRepository bookRepository;
	private final BookInfoRepository bookInfoRepository;
	private final BookImageRepository bookImageRepository;

	private final RentRepository rentRepository;

	private final AddressService addressService;
	private final HomeTownRepository homeTownRepository;

	private final ModelMapper modelMapper;

	private final StorageUploader storageUploader;

	private final UserService userService;

	private static int PAGESIZE = 20;
	private static final double DEFAULT_RANGED = 3.0;

	/*
	 * 카테고리 조회
	 */
	@Override
	public List<BookCategoryDto> findAllBookCategory() {
		return bookCategoryRepositroy.findAll()
			.stream()
			.map(BookCategoryDto::from)
			.collect(Collectors.toList());
	}

	/*
	 * 인근 도서 조회
	 */
	@Override
	public PageResponse<BookResponse> findBookList(BookRequest bookRequest) {
		//페이징 선언
		PageRequest pageRequest = PageRequest.of(bookRequest.getPageNum() - 1, PAGESIZE,
			Sort.by(bookRequest.getOrder()).descending());

		//인근 지역 ID 가져오기
		List<Long> townIdList = addressService.getNearTown(bookRequest.getTownId(), DEFAULT_RANGED)
			.stream()
			.map(TownDto::getId)
			.collect(Collectors.toList());

		/*
		 * 페이징 결과조회
		 * query 파라미터 유무에 따라 검색인지 리스트 조회인지 판단(?)
		 * 대여중/예약중 리스트를 같이 보려면 쿼리를 구분해줘야할듯!
		 */
		Page<BookResponse> pageList;

		//도서 상태 IN절
		List<BookStatus> bookStatus = new ArrayList<>();
		if (bookRequest.getStatus().equals(BookStatus.ABLE)) {
			bookStatus.add(BookStatus.ABLE);
		} else {
			bookStatus.add(BookStatus.ING);
			bookStatus.add(BookStatus.ON);
		}

		/*
		 * 카테고리 ID가 0인 것은 전체 카테고리 조회로 판단한다.
		 */
		if (bookRequest.getCategoryId().equals(Long.parseLong("0"))) {
			pageList = bookRepository.findByStatusInAndIsDeleteFalseAndIsHideFalseAndSubjectContainsAndTownIdIn(
				bookStatus,
				bookRequest.getQuery(),
				townIdList,
				pageRequest).map(BookResponse::from);
		} else {
			pageList = bookRepository
				.findByStatusInAndIsDeleteFalseAndIsHideFalseAndSubjectContainsAndTownIdInAndBookCategoryId(
					bookStatus,
					bookRequest.getQuery(),
					townIdList,
					bookRequest.getCategoryId(),
					pageRequest)
				.map(BookResponse::from);
			;
		}

		return PageResponse.<BookResponse>builder()
			.contents(pageList.getContent())
			.pageNumber(pageList.getNumber())
			.pageSize(pageList.getSize())
			.totalPages(pageList.getTotalPages())
			.totalElements(pageList.getTotalElements())
			.build();
	}

	/*
	 * 도서 등록
	 */
	@Override
	@Transactional
	public Long bookSave(Long ownerId, BookUploadRequest bookUploadRequest, List<MultipartFile> imageFiles) {
		/*
		 * 도서 업로드 로직
		 */
		//대여자 정보 조회.
		UserDto userDto = userService.getById(ownerId);

		//API일 경우 Book_Info 저장 isbn으로 판단
		BookInfo bookInfo = null;
		if (bookUploadRequest.getIsbn() != null && !bookUploadRequest.getIsbn().isEmpty()) {
			//API 도서가 이미 등록되어있는지 체크
			/*
			 * orElse 사용시 isbn이 같은 데이터를 찾아 반환하고 save시에 새로운 객체를 생성하는 문제 발생
			 * orElseGet 으로 변경
			 * orElse는 값을 포함하더라도 항상 객체를 생성
			 */
			bookInfo = bookInfoRepository.findByIsbn(bookUploadRequest.getIsbn())
				.orElseGet(() -> bookInfoRepository
					.save(BookInfo.from(modelMapper.map(bookUploadRequest, BookInfoDto.class))));
		}

		//Entity builder
		HomeTown homeTown = homeTownRepository.findByUserIdAndUseStatus(userDto.getId(), UseStatusType.Y);

		Book book = Book.builder()
			.author(bookUploadRequest.getAuthor())
			.content(bookUploadRequest.getContent())
			.deposit(bookUploadRequest.getDeposit())
			.subject(bookUploadRequest.getSubject())
			.grade(bookUploadRequest.getGrade())
			.bookInfo(bookInfo)
			.bookCategory(BookCategory.builder().id(bookUploadRequest.getBookCategoryId()).build())
			.owner(User.builder().id(userDto.getId()).build())
			.town(Town.builder().id(homeTown.getTown().getId()).build())
			.build();

		//섬네일 업데이트를 위한 리스트
		List<FileUploadResponse> imageList = new ArrayList<>();

		//API 도서 조회로 섬네일이 API 이미지 경로 인경우
		if (bookUploadRequest.getIsbn() != null && !bookUploadRequest.getIsbn().isEmpty()) {
			imageList.add(new FileUploadResponse(bookUploadRequest.getThumbnail(), bookUploadRequest.getThumbnail()));
			book.addImage(BookImage.builder().imageUrl(bookUploadRequest.getThumbnail()).build());
		}
		//이미지 업로드
		try {
			for (MultipartFile imageFile : imageFiles) {
				FileUploadResponse fileUploadResponse = storageUploader.upload(imageFile, "book");
				imageList.add(fileUploadResponse);
				book.addImage(BookImage.builder().imageUrl(fileUploadResponse.getUrl()).build());

			}
		} catch (Exception e) {}

		Book resultBook = bookRepository.save(book);

		//대표이미지 지정
		//대표이미지 지정이 없을 경우 첫 이미지가 대표이미지라고 생각하기
		if (imageList.size() > 0) {
			FileUploadResponse thumbnail = imageList.stream()
				.filter(uploadResponse -> uploadResponse.getFileName().equals(bookUploadRequest.getThumbnail()))
				.findFirst()
				.orElse(imageList.get(0));

			BookImage bookImage = bookImageRepository.findByImageUrlAndBookId(thumbnail.getUrl(),
				resultBook.getId());
			resultBook.updateThumbnail(bookImage);
			bookRepository.save(resultBook);
		}

		return resultBook.getId();
	}

	/*
	 * 도서 상세 정보
	 */
	@Override
	public BookDto findById(Long bookId) {
		return bookRepository.findById(bookId)
			.map(BookDto::from)
			.orElseThrow(() -> new IllegalArgumentException());
	}

	@Override
	public BookDetailResponse findByIdDetail(Long bookId) {
		return bookRepository.findById(bookId)
			.map(BookDetailResponse::from)
			.orElseThrow(() -> new IllegalArgumentException());
	}

	/*
	 * 도서 삭제 (update isDelete = Y)
	 * 대여가 진행중이거나 대여가 완료된 책이 있을 경우에는 isDelete값 변경
	 * 그것이 아니라면 데이터 삭제.
	 */
	@Override
	@Transactional
	public void removeBook(Long bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());

		Rent rent = rentRepository.findByBookId(bookId).orElse(null);

		if (rent == null) {
			bookRepository.deleteById(bookId);
		} else {
			book.removeBook();
			bookRepository.save(book);
		}
	}

	/*
	 * 도서 상태값 수정
	 */
	@Override
	@Transactional
	public void updateStatus(Long bookId, BookStatus status) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());
		book.updateStatus(status);

		bookRepository.save(book);
	}

	/*
	 * 도서 등급 수정
	 */
	@Override
	@Transactional
	public void updateGrade(Long bookId, BookGrade grade) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());
		book.updateGrade(grade);

		bookRepository.save(book);
	}

	/*
	 * 도서 수정
	 */
	@Override
	@Transactional
	public void bookUpdate(Long bookId, BookUploadRequest bookUploadRequest, List<MultipartFile> imageFiles) {
		//변경 전 도서 조회
		Book currBook = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());

		//이미지를 전체 변경했을 경우
		List<Long> bookImageIds = currBook.getImages().stream().map(BookImage::getId)
			.collect(Collectors.toList());

		/*
		 * 변경 될 사항들
		 * API 도서 조회 <-> 직접 등록
		 * 글 제목, 책 소개, 보증금, 책등급, 카테고리
		 * 이미지 변경
		 */

		BookInfo bookInfo = null;
		/*
		 * Request로 받아온 ISBN 유무 체크
		 * ISBN이 있으면 API도서 조회르 수정.
		 * 이전에 등록된 도서와 상관없음!
		 */
		if (bookUploadRequest.getIsbn() != null && !bookUploadRequest.getIsbn().isEmpty()) {
			bookInfo = bookInfoRepository.findByIsbn(bookUploadRequest.getIsbn())
				.orElseGet(() -> bookInfoRepository
					.save(BookInfo.from(modelMapper.map(bookUploadRequest, BookInfoDto.class))));
		}

		//섬네일 초기값 선언
		BookImage bookImage = currBook.getThumbnail();

		//변경 도서 빌더
		Book updateBook = Book.builder()
			.id(bookId)
			.author(bookUploadRequest.getAuthor())
			.content(bookUploadRequest.getContent())
			.deposit(bookUploadRequest.getDeposit())
			.subject(bookUploadRequest.getSubject())
			.grade(bookUploadRequest.getGrade())
			.bookInfo(bookInfo)
			.bookCategory(BookCategory.builder().id(bookUploadRequest.getBookCategoryId()).build())
			.owner(currBook.getOwner())
			.town(currBook.getTown())
			.thumbnail(bookImage)
			.build();

		//섬네일 업데이트를 위한 리스트
		List<FileUploadResponse> imageList = new ArrayList<>();

		//API 도서 조회로 섬네일이 API 이미지 경로 인경우
		if (!bookImage.getImageUrl().equals(bookUploadRequest.getThumbnail())) {
			if (bookUploadRequest.getIsbn() != null && !bookUploadRequest.getIsbn().isEmpty()) {
				imageList
					.add(new FileUploadResponse(bookUploadRequest.getThumbnail(), bookUploadRequest.getThumbnail()));
				updateBook.addImage(BookImage.builder().imageUrl(bookUploadRequest.getThumbnail()).build());
			}
		}

		//이미지 업로드
		try {
			for (MultipartFile imageFile : imageFiles) {
				FileUploadResponse fileUploadResponse = storageUploader.upload(imageFile, "book");
				imageList.add(fileUploadResponse);
				updateBook.addImage(BookImage.builder().imageUrl(fileUploadResponse.getUrl()).build());

			}
		} catch (Exception e) {}

		Book resultBook = bookRepository.save(updateBook);

		//대표이미지 지정
		if (imageList.size() > 0) {
			FileUploadResponse thumbnail = imageList.stream()
				.filter(uploadResponse -> uploadResponse.getFileName().equals(bookUploadRequest.getThumbnail()))
				.findFirst()
				.orElse(imageList.get(0));

			BookImage bookThumbnail = bookImageRepository.findByImageUrlAndBookId(thumbnail.getUrl(),
				resultBook.getId());
			resultBook.updateThumbnail(bookThumbnail);
			bookRepository.save(resultBook);
		}

		//DB 이미지 리스트와 넘겨받은 Image 리스트의 ID 비교후 없으면 삭제.
		bookImageIds.stream().filter(currImageId -> !bookUploadRequest.getBookImages()
			.stream()
			.anyMatch(image -> image.getId().equals(currImageId))).forEach(bookImageRepository::deleteById);

	}

	@Override
	public PageResponse<MyBookResponse> getMyBookList(Long ownerId, int pageNum) {
		PageRequest pageRequest = PageRequest.of(pageNum - 1, PAGESIZE);

		Page<MyBookResponse> myBookList = bookRepository.findByOwnerId(ownerId, pageRequest)
			.map(MyBookResponse::from);

		return PageResponse.<MyBookResponse>builder()
			.contents(myBookList.getContent())
			.pageNumber(myBookList.getNumber())
			.pageSize(myBookList.getSize())
			.totalPages(myBookList.getTotalPages())
			.totalElements(myBookList.getTotalElements())
			.build();
	}

	/*
	 * 도서 숨기기
	 */
	@Override
	@Transactional
	public void updateHide(Long bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());

		book.updateHide();
		bookRepository.save(book);
	}

}
