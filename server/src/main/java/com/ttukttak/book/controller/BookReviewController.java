package com.ttukttak.book.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.book.dto.BookReviewResponse;
import com.ttukttak.book.service.BookReviewService;
import com.ttukttak.common.dto.PageResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(value = "/api/v1", description = "도서 리뷰 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/books")
public class BookReviewController {
	private final BookReviewService bookReviewService;

	@ApiImplicitParams({
		@ApiImplicitParam(name = "bookId", value = "도서 ID", required = true, dataType = "long", paramType = "path"),
		@ApiImplicitParam(name = "pageNum", value = "페이지번호", required = true, dataType = "int", paramType = "param")
	})
	@ApiOperation(value = "도서 리뷰 조회")
	@GetMapping("/{bookId}/reviews")
	public ResponseEntity<PageResponse<BookReviewResponse>> getBookReviews(
		@PathVariable
		Long bookId,
		@RequestParam(defaultValue = "1")
		int pageNum) {

		return ResponseEntity.ok(bookReviewService.getReviews(bookId, pageNum));
	}
}
