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
	 * ???????????? ??????
	 */
	@Override
	public List<BookCategoryDto> findAllBookCategory() {
		return bookCategoryRepositroy.findAll()
			.stream()
			.map(category -> modelMapper.map(category, BookCategoryDto.class))
			.collect(Collectors.toList());
	}

	/*
	 * ?????? ?????? ??????
	 */
	@Override
	public PageResponse<BookResponse> findBookList(BookRequest bookRequest) {
		//????????? ??????
		PageRequest pageRequest = PageRequest.of(bookRequest.getPageNum() - 1, PAGESIZE,
			Sort.by(bookRequest.getOrder()).descending());

		//?????? ?????? ID ????????????
		List<Long> townIdList = addressService.getNearTown(bookRequest.getTownId(), 3)
			.stream()
			.map(TownDto::getId)
			.collect(Collectors.toList());

		/*
		 * ????????? ????????????
		 * query ???????????? ????????? ?????? ???????????? ????????? ???????????? ??????(?)
		 * ?????????/????????? ???????????? ?????? ????????? ????????? ?????????????????????!
		 */
		Page<BookResponse> pageList;

		//?????? ?????? IN???
		List<BookStatus> bookStatus = new ArrayList<>();
		if (bookRequest.getStatus().equals(BookStatus.ABLE)) {
			bookStatus.add(BookStatus.ABLE);
		} else {
			bookStatus.add(BookStatus.ING);
			bookStatus.add(BookStatus.ON);
		}

		/*
		 * ???????????? ID??? 0??? ?????? ?????? ???????????? ????????? ????????????.
		 */
		if (bookRequest.getCategoryId().equals(Long.parseLong("0"))) {
			pageList = bookRepository.findByStatusInAndIsDeleteFalseAndSubjectContainsAndTownIdIn(
				bookStatus,
				bookRequest.getQuery(),
				townIdList,
				pageRequest).map(BookResponse::from);
		} else {
			pageList = bookRepository.findByStatusInAndIsDeleteFalseAndSubjectContainsAndTownIdInAndBookCategoryId(
				bookStatus,
				bookRequest.getQuery(),
				townIdList,
				bookRequest.getCategoryId(),
				pageRequest).map(BookResponse::from);
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
	 * ?????? ??????
	 */
	@Override
	@Transactional
	public Long bookSave(Long ownerId, BookUploadRequest bookUploadRequest, List<MultipartFile> imageFiles) {
		/*
		 * ?????? ????????? ??????
		 */
		//????????? ?????? ??????.
		UserDto userDto = userService.getById(ownerId);

		//API??? ?????? Book_Info ?????? isbn?????? ??????
		BookInfo bookInfo = null;
		if (bookUploadRequest.getIsbn() != null && !bookUploadRequest.getIsbn().isEmpty()) {
			//API ????????? ?????? ????????????????????? ??????
			bookInfo = bookInfoRepository.findByIsbn(bookUploadRequest.getIsbn())
				.orElse(bookInfoRepository.save(
					BookInfo.from(modelMapper.map(bookUploadRequest, BookInfoDto.class))));
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

		//????????? ??????????????? ?????? ?????????
		List<FileUploadResponse> imageList = new ArrayList<>();

		//API ?????? ????????? ???????????? API ????????? ?????? ?????????
		if (bookUploadRequest.getIsbn() != null && !bookUploadRequest.getIsbn().isEmpty()) {
			imageList.add(new FileUploadResponse(bookUploadRequest.getThumbnail(), bookUploadRequest.getThumbnail()));
			book.addImage(BookImage.builder().imageUrl(bookUploadRequest.getThumbnail()).build());
		}
		//????????? ?????????
		try {
			for (MultipartFile imageFile : imageFiles) {
				FileUploadResponse fileUploadResponse = storageUploader.upload(imageFile, "book");
				imageList.add(fileUploadResponse);
				book.addImage(BookImage.builder().imageUrl(fileUploadResponse.getUrl()).build());

			}
		} catch (Exception e) {}

		Book resultBook = bookRepository.save(book);

		//??????????????? ??????		
		for (FileUploadResponse uploadResponse : imageList) {
			if (uploadResponse.getFileName().equals(bookUploadRequest.getThumbnail())) {
				BookImage bookImage = bookImageRepository.findByImageUrlAndBookId(uploadResponse.getUrl(),
					resultBook.getId());
				resultBook.updateThumbnail(bookImage);
				bookRepository.save(resultBook);
				break;
			}
		}

		return resultBook.getId();
	}

	/*
	 * ?????? ?????? ??????
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
	 * ?????? ?????? (update isDelete = Y)
	 */
	@Override
	@Transactional
	public void removeBook(Long bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());
		book.removeBook();
		bookRepository.save(book);
	}

	/*
	 * ?????? ????????? ??????
	 */
	@Override
	@Transactional
	public void updateStatus(Long bookId, BookStatus status) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());
		book.updateStatus(status);

		bookRepository.save(book);
	}

	/*
	 * ?????? ?????? ??????
	 */
	@Override
	@Transactional
	public void updateGrade(Long bookId, BookGrade grade) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());
		book.updateGrade(grade);

		bookRepository.save(book);
	}

	/*
	 * ?????? ??????
	 */
	@Override
	@Transactional
	public void bookUpdate(Long bookId, BookUploadRequest bookUploadRequest, List<MultipartFile> imageFiles) {
		//?????? ??? ?????? ??????
		Book currBook = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());

		//???????????? ?????? ???????????? ??????
		List<Long> bookImageIds = currBook.getImages().stream().map(BookImage::getId)
			.collect(Collectors.toList());

		/*
		 * ?????? ??? ?????????
		 * API ?????? ?????? <-> ?????? ??????
		 * ??? ??????, ??? ??????, ?????????, ?????????, ????????????
		 * ????????? ??????
		 */

		BookInfo bookInfo = currBook.getBookInfo();
		/*
		 * Request??? ????????? ISBN ?????? ??????
		 * ISBN??? ????????? API?????? ????????? ??????.
		 * ????????? ????????? ????????? ????????????!
		 */
		if (bookUploadRequest.getIsbn() != null && !bookUploadRequest.getIsbn().isEmpty()) {
			bookInfo = bookInfoRepository.findByIsbn(bookUploadRequest.getIsbn())
				.orElse(bookInfoRepository.save(
					BookInfo.from(modelMapper.map(bookUploadRequest, BookInfoDto.class))));
		} else {
			bookInfo = null;
		}

		//????????? ????????? ??????
		BookImage bookImage = currBook.getThumbnail();

		//?????? ?????? ??????
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

		/*
		 * ????????? ?????? ?????? -- ?????? ?????????
		 */
		//????????? ??????????????? ?????? ?????????
		List<FileUploadResponse> imageList = new ArrayList<>();

		//API ?????? ????????? ???????????? API ????????? ?????? ?????????
		if (!bookImage.getImageUrl().equals(bookUploadRequest.getThumbnail())) {
			if (bookUploadRequest.getIsbn() != null && !bookUploadRequest.getIsbn().isEmpty()) {
				imageList
					.add(new FileUploadResponse(bookUploadRequest.getThumbnail(), bookUploadRequest.getThumbnail()));
				updateBook.addImage(BookImage.builder().imageUrl(bookUploadRequest.getThumbnail()).build());
			}
		}

		//????????? ?????????
		try {
			for (MultipartFile imageFile : imageFiles) {
				FileUploadResponse fileUploadResponse = storageUploader.upload(imageFile, "book");
				imageList.add(fileUploadResponse);
				updateBook.addImage(BookImage.builder().imageUrl(fileUploadResponse.getUrl()).build());

			}
		} catch (Exception e) {}

		Book resultBook = bookRepository.save(updateBook);

		//??????????????? ??????
		for (FileUploadResponse uploadResponse : imageList) {
			if (uploadResponse.getFileName().equals(bookUploadRequest.getThumbnail())) {
				BookImage bookThumbnail = bookImageRepository.findByImageUrlAndBookId(uploadResponse.getUrl(),
					bookId);
				resultBook.updateThumbnail(bookThumbnail);
				bookRepository.save(resultBook);
				break;
			}
		}

		//DB ????????? ???????????? ???????????? Image ???????????? ID ????????? ????????? ??????.
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

}
