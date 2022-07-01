package com.ttukttak.book.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.book.dto.BookRequest;
import com.ttukttak.book.dto.BookResponse;
import com.ttukttak.book.dto.BookUploadRequest;
import com.ttukttak.book.entity.Book.BookStatus;
import com.ttukttak.book.service.BookService;
import com.ttukttak.book.service.InterParkAPIService;
import com.ttukttak.book.vo.InterParkRequest;
import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.UserPrincipal;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(value = "/api/book", description = "도서 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/book")
public class BookController {
	private final InterParkAPIService interParkAPIService;
	private final BookService bookService;

	@ApiImplicitParam(name = "InterParkRequest", value = "인터파크 조회 값", required = true, dataType = "object", paramType = "body")
	@ApiOperation(value = "인터파크 도서 조회")
	@GetMapping("/interpark/search")
	public ResponseEntity<PageResponse<BookInfoDto>> search(InterParkRequest interParkRequest) {

		PageResponse<BookInfoDto> searchResult = interParkAPIService.search(interParkRequest);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(searchResult);
	}

	@ApiOperation(value = "카테고리 조회")
	@GetMapping("/category")
	public ResponseEntity<List<BookCategoryDto>> getCategory() {
		List<BookCategoryDto> bookCategoryList = bookService.findAllBookCategory();

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(bookCategoryList);
	}

	@ApiOperation(value = "주변 도서 리스트 조회")
	@GetMapping("/list")
	public ResponseEntity<PageResponse<BookResponse>> getNearBookList(
		@RequestParam(defaultValue = "1")
		int pageNo, @RequestParam(defaultValue = "id")
		String order, @RequestParam
		BookStatus status, @RequestParam
		Long townId) {

		BookRequest bookRequest = new BookRequest(pageNo, order, status, townId, null);
		PageResponse<BookResponse> bookList = bookService.findBookList(bookRequest);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(bookList);
	}

	@ApiOperation(value = "도서 겅색")
	@GetMapping("/list/search")
	public ResponseEntity<PageResponse<BookResponse>> getBookListSearch(
		@RequestParam(defaultValue = "1")
		int pageNo, @RequestParam(defaultValue = "id")
		String order, @RequestParam
		BookStatus status, @RequestParam(defaultValue = "1111011900")
		Long townId, @RequestParam
		String query) {

		BookRequest bookRequest = new BookRequest(pageNo, order, status, townId, query);
		PageResponse<BookResponse> bookList = bookService.findBookList(bookRequest);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(bookList);
	}

	@ApiOperation(value = "도서 등록")
	@PostMapping("")
	public ResponseEntity<Long> setBook(
		BookUploadRequest bookUploadRequest,
		@CurrentUser
		UserPrincipal userPrincipal,
		@RequestBody
		List<MultipartFile> imageFiles) {

		Long bookId = bookService.bookSave(userPrincipal.getId(), bookUploadRequest, imageFiles);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(bookId);
	}

}
