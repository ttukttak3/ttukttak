package com.ttukttak.book.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ttukttak.book.dto.BookReviewResponse;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.book.repository.BookReviewRepository;
import com.ttukttak.common.dto.PageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookReviewServiceImpl implements BookReviewService {
	private final BookReviewRepository bookReviewRepository;
	private final BookRepository bookRepository;

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
}
