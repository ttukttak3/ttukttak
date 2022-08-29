package com.ttukttak.book.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ttukttak.book.dto.BookReviewRequest;
import com.ttukttak.book.dto.BookReviewResponse;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.BookReview;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.book.repository.BookReviewRepository;
import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookReviewServiceImpl implements BookReviewService {
	private final BookReviewRepository bookReviewRepository;
	private final BookRepository bookRepository;
	private final UserRepository userRepository;

	private static int PAGESIZE = 20;

	@Override
	public PageResponse<BookReviewResponse> getReviews(Long bookId, int pageNum) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());

		//페이징 선언
		PageRequest pageRequest = PageRequest.of(pageNum - 1, PAGESIZE,
			Sort.by("id").descending());

		Page<BookReviewResponse> pageInfo = bookReviewRepository.findAllByBook(book, pageRequest)
			.map(BookReviewResponse::from);

		return PageResponse.<BookReviewResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements(pageInfo.getTotalElements())
			.build();
	}

	@Override
	@Transactional
	public BookReviewResponse setReviews(Long bookId, Long userId, BookReviewRequest bookReviewRequest) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException());
		User reviewer = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException());

		BookReview bookReview = BookReview.builder()
			.book(book)
			.reviewer(reviewer)
			.content(bookReviewRequest.getContent())
			.rating(bookReviewRequest.getRating())
			.build();

		return BookReviewResponse.from(bookReviewRepository.save(bookReview));
	}
}
