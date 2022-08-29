package com.ttukttak.book.service;

import com.ttukttak.book.dto.BookReviewRequest;
import com.ttukttak.book.dto.BookReviewResponse;
import com.ttukttak.common.dto.PageResponse;

public interface BookReviewService {

	PageResponse<BookReviewResponse> getReviews(Long bookId, int pageNum);

	BookReviewResponse setReviews(Long bookId, Long userId, BookReviewRequest bookReviewRequest);

}
