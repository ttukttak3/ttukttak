package com.ttukttak.book.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookDetailResponse;
import com.ttukttak.book.dto.BookImageDto;
import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.book.dto.BookRequest;
import com.ttukttak.book.dto.BookResponse;
import com.ttukttak.book.dto.BookUploadRequest;
import com.ttukttak.book.dto.MyBookResponse;
import com.ttukttak.book.entity.Book.BookGrade;
import com.ttukttak.book.entity.Book.BookStatus;
import com.ttukttak.book.service.BookService;
import com.ttukttak.book.service.InterParkAPIService;
import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.UserPrincipal;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "/api/v1", description = "도서 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class BookController {
	private static final String DEFAULT_TOWN_ID = "1111011900";
	private final InterParkAPIService interParkAPIService;
	private final BookService bookService;
	private final ObjectMapper mapper;

	@ApiImplicitParams({
		@ApiImplicitParam(name = "pageNum", value = "페이지 번호", required = true, dataType = "int", paramType = "param"),
		@ApiImplicitParam(name = "query", value = "검색어", required = true, dataType = "string", paramType = "param")
	})
	@ApiOperation(value = "인터파크 도서 조회")
	@GetMapping("/books/interpark/search")
	public ResponseEntity<PageResponse<BookInfoDto>> search(
		@RequestParam
		String query,
		@RequestParam
		int pageNum) {

		return ResponseEntity.ok(interParkAPIService.search(query, pageNum));
	}

	@ApiOperation(value = "카테고리 조회")
	@GetMapping("/books/category")
	public ResponseEntity<List<BookCategoryDto>> getCategory() {

		return ResponseEntity.ok(bookService.findAllBookCategory());
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "pageNum", value = "페이지번호", required = true, dataType = "int", paramType = "param"),
		@ApiImplicitParam(name = "order", value = "정렬", required = false, dataType = "string", paramType = "param"),
		@ApiImplicitParam(name = "status", value = "도서 상태", required = true, dataType = "string", paramType = "param"),
		@ApiImplicitParam(name = "categoryId", value = "카테고리 ID", required = false, dataType = "long", paramType = "param"),
		@ApiImplicitParam(name = "townId", value = "지역 ID", required = false, dataType = "long", paramType = "param"),
		@ApiImplicitParam(name = "query", value = "검색어", required = false, dataType = "string", paramType = "param")
	})

	@ApiOperation(value = "도서 리스트 조회")
	@GetMapping("/books")
	public ResponseEntity<PageResponse<BookResponse>> getNearBookList(
		@RequestParam(defaultValue = "1")
		int pageNum,
		@RequestParam(defaultValue = "id")
		String order,
		@RequestParam
		BookStatus status,
		@RequestParam(defaultValue = DEFAULT_TOWN_ID)
		Long townId,
		@RequestParam(defaultValue = "0")
		Long categoryId,
		@RequestParam(defaultValue = "")
		String query) {

		BookRequest bookRequest = new BookRequest(pageNum, order, status, townId, categoryId, query);

		return ResponseEntity.ok(bookService.findBookList(bookRequest));
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "bookUploadRequest", value = "도서 정보 bookUploadRequest", required = true, dataType = "BookUploadRequest", paramType = "body"),
		@ApiImplicitParam(name = "userPrincipal", value = "유저 정보", required = true, dataType = "UserPrincipal", paramType = "header"),
		@ApiImplicitParam(name = "imageFiles", value = "이미지 파일", required = true, dataType = "file", paramType = "body"),
	})
	@ApiOperation(value = "도서 등록")
	@PostMapping("/books")
	public ResponseEntity<Long> setBook(
		BookUploadRequest bookUploadRequest,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal,
		@RequestBody
		List<MultipartFile> imageFiles) {

		Long bookId = bookService.bookSave(userPrincipal.getId(), bookUploadRequest, imageFiles);

		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{bookId}")
			.buildAndExpand(bookId)
			.toUri();

		return ResponseEntity
			.created(location)
			.body(bookId);
	}

	@ApiImplicitParam(name = "bookId", value = "도서 ID", required = true, dataType = "long", paramType = "path")
	@ApiOperation(value = "도서 상세 정보")
	@GetMapping("/books/{bookId}")
	public ResponseEntity<BookDetailResponse> getBook(@PathVariable
	Long bookId) {

		return ResponseEntity.ok(bookService.findByIdDetail(bookId));
	}

	@ApiImplicitParam(name = "bookId", value = "도서 ID", required = true, dataType = "long", paramType = "path")
	@ApiOperation(value = "도서 삭제")
	@DeleteMapping("/books/{bookId}")
	public ResponseEntity<Boolean> setBookisDelete(@PathVariable
	Long bookId) {

		bookService.removeBook(bookId);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();

	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "bookId", value = "도서 ID", required = true, dataType = "long", paramType = "path"),
		@ApiImplicitParam(name = "status", value = "도서 상태값", required = true, dataType = "BookStatus", paramType = "body")
	})
	@ApiOperation(value = "도서 상태값 수정")
	@PatchMapping("/books/{bookId}/status")
	public ResponseEntity<Boolean> updateBookStatus(@PathVariable
	Long bookId, @RequestBody
	BookStatus status) {

		bookService.updateStatus(bookId, status);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();

	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "bookId", value = "도서 ID", required = true, dataType = "long", paramType = "path"),
		@ApiImplicitParam(name = "grade", value = "도서 등급", required = true, dataType = "BookGrade", paramType = "body")
	})
	@ApiOperation(value = "도서 등급 수정")
	@PatchMapping("/books/{bookId}/grade")
	public ResponseEntity<Boolean> updateBookGrade(
		@PathVariable
		Long bookId,
		@RequestBody
		BookGrade grade) {

		bookService.updateGrade(bookId, grade);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();

	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "bookUploadRequest", value = "도서 정보 bookUploadRequest", required = true, dataType = "BookUploadRequest", paramType = "body"),
		@ApiImplicitParam(name = "imageFiles", value = "이미지 파일", required = false, dataType = "file", paramType = "body"),
	})
	@ApiOperation(value = "도서 수정")
	@PutMapping("/books/{bookId}")
	public ResponseEntity<Boolean> updateBook(
		@PathVariable
		Long bookId,
		BookUploadRequest bookUploadRequest,
		@RequestBody
		List<MultipartFile> imageFiles,
		@RequestParam
		String bookImagesJson) {

		//json -> dto 변환
		try {
			bookUploadRequest.setBookImages(mapper.readValue(bookImagesJson,
				mapper.getTypeFactory().constructCollectionType(List.class, BookImageDto.class)));
		} catch (Exception e) {
			bookUploadRequest.setBookImages(new ArrayList<BookImageDto>());
		}

		bookService.bookUpdate(bookId, bookUploadRequest, imageFiles);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();
	}

	@ApiImplicitParam(name = "pageNum", value = "페이지 번호", required = true, dataType = "int", paramType = "param")
	@ApiOperation(value = "내 도서 조회")
	@GetMapping("/users/{userId}/books")
	public ResponseEntity<PageResponse<MyBookResponse>> getBook(
		@PathVariable
		Long userId,
		@RequestParam(defaultValue = "1")
		int pageNum) {

		return ResponseEntity.ok(bookService.getMyBookList(userId, pageNum));
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "bookId", value = "도서 ID", required = true, dataType = "long", paramType = "path")
	})
	@ApiOperation(value = "도서 숨기기")
	@PatchMapping("/books/{bookId}/hide")
	public ResponseEntity<Boolean> updateBookHide(
		@PathVariable
		Long bookId) {

		bookService.updateHide(bookId);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();

	}

}
