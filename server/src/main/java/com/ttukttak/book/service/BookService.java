package com.ttukttak.book.service;

import java.util.List;

import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookRequest;
import com.ttukttak.book.dto.BookResponse;
import com.ttukttak.common.dto.PageResponse;

public interface BookService {

	List<BookCategoryDto> findAllBookCategory();

	PageResponse<BookResponse> findBookList(BookRequest bookRequest);

}
