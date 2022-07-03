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

import com.ttukttak.address.entity.HomeTown;
import com.ttukttak.address.entity.HomeTown.UseStatusType;
import com.ttukttak.address.entity.Town;
import com.ttukttak.address.repository.HomeTownRepository;
import com.ttukttak.address.service.AddressService;
import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookDto;
import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.book.dto.BookRequest;
import com.ttukttak.book.dto.BookResponse;
import com.ttukttak.book.dto.BookUploadRequest;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.DeleteStatus;
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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {
	private final BookCategoryRepositroy bookCategoryRepositroy;
	private final BookRepository bookRepository;
	private final BookInfoRepository bookInfoRepository;
	private final BookImageRepository bookImageRepository;

	private final AddressService addressService;
	private final HomeTownRepository homeTownRepository;

	private final ModelMapper modelMapper;

	private final StorageUploader storageUploader;

	private final UserService userService;

	private static int PAGESIZE = 20;

	/*
	 * 카테고리 조회
	 */
	@Override
	public List<BookCategoryDto> findAllBookCategory() {
		return bookCategoryRepositroy.findAll()
			.stream()
			.map(category -> modelMapper.map(category, BookCategoryDto.class))
			.collect(Collectors.toList());
	}

	/*
	 * 인근 도서 조회
	 */
	@Override
	public PageResponse<BookResponse> findBookList(BookRequest bookRequest) {
		//페이징 선언
		PageRequest pageRequest = PageRequest.of(bookRequest.getPageNo() - 1, PAGESIZE,
			Sort.by(bookRequest.getOrder()).descending());

		//인근 지역 ID 가져오기
		List<Long> townIdList = addressService.getNearTown(bookRequest.getTownId(), 3)
			.stream()
			.map(c -> new Long(c.getId()))
			.collect(Collectors.toList());

		/*
		 * 페이징 결과조회
		 * query 파라미터 유무에 따라 검색인지 리스트 조회인지 판단(?)
		 */
		Page<Book> pageList;

		if (bookRequest.getQuery() == null) {
			pageList = bookRepository.findByStatusAndIsDeleteAndTownIdIn(
				bookRequest.getStatus(),
				DeleteStatus.N,
				townIdList,
				pageRequest);
		} else {
			pageList = bookRepository.findByStatusAndIsDeleteAndSubjectContainsAndTownIdIn(
				bookRequest.getStatus(),
				DeleteStatus.N,
				bookRequest.getQuery(),
				townIdList,
				pageRequest);
		}

		//Entity -> Dto 변환
		List<BookResponse> bookResponses = pageList.getContent()
			.stream()
			.map(book -> new BookResponse(book))
			.collect(Collectors.toList());

		return PageResponse.<BookResponse>builder()
			.contents(bookResponses)
			.pageNumber(bookRequest.getPageNo())
			.pageSize(pageList.getSize())
			.totalPages(pageList.getTotalPages())
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
			bookInfo = bookInfoRepository.findByIsbn(bookUploadRequest.getIsbn());
			if (bookInfo == null) {
				BookInfo bookInfoRequest = BookInfo.of(modelMapper.map(bookUploadRequest, BookInfoDto.class));
				bookInfo = bookInfoRepository.saveAndFlush(bookInfoRequest);
			}
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

		Book resultBook = bookRepository.saveAndFlush(book);

		//대표이미지 지정
		for (FileUploadResponse uploadResponse : imageList) {
			if (uploadResponse.getFileName().equals(bookUploadRequest.getThumbnail())) {
				BookImage bookImage = bookImageRepository.findByImageUrlAndBookId(uploadResponse.getUrl(),
					resultBook.getId());
				resultBook.updateThumbnail(bookImage);

				break;
			}
		}
		bookRepository.save(resultBook);

		return resultBook.getId();
	}

	/*
	 * 도서 상세 정보
	 */
	@Override
	public BookDto findById(Long bookId) {
		return bookRepository.findById(bookId)
			.map(book -> new BookDto(book))
			.orElse(null);
	}

	/*
	 * 도서 삭제 (update isDelete = Y)
	 */
	@Override
	@Transactional
	public Boolean isDelete(Long bookId) {
		Book book = bookRepository.findById(bookId).orElse(null);
		book.isDelete(DeleteStatus.Y);

		bookRepository.save(book);

		return true;
	}

}
