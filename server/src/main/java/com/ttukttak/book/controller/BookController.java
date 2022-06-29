package com.ttukttak.book.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.book.service.BookService;
import com.ttukttak.book.service.InterParkAPIService;
import com.ttukttak.book.vo.InterParkRequest;
import com.ttukttak.common.dto.PageResponse;

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

}
