package com.ttukttak.book.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ttukttak.book.dto.BookReviewRequest;
import com.ttukttak.book.dto.BookReviewResponse;
import com.ttukttak.book.service.BookReviewService;
import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.UserPrincipal;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "/api/v1", description = "도서 리뷰 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/books")
public class BookReviewController {
	private final BookReviewService bookReviewService;

	@ApiOperation(value = "도서 리뷰 조회")
	@GetMapping("/{bookId}/reviews")
	public ResponseEntity<PageResponse<BookReviewResponse>> getBookReviews(
		@PathVariable
		Long bookId,
		@RequestParam(defaultValue = "1")
		int pageNum) {

		return ResponseEntity.ok(bookReviewService.getReviews(bookId, pageNum));
	}

	@ApiOperation(value = "도서 리뷰 등록")
	@PostMapping("/{bookId}/reviews")
	public ResponseEntity<BookReviewResponse> setBookReviews(
		@PathVariable
		Long bookId,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal,
		@RequestBody
		BookReviewRequest bookReviewRequest) {

		BookReviewResponse response = bookReviewService.setReviews(bookId, userPrincipal.getId(), bookReviewRequest);

		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{bookId}")
			.buildAndExpand(response.getId())
			.toUri();

		return ResponseEntity
			.created(location)
			.body(response);
	}
}
