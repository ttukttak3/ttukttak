package com.ttukttak.book.service;

import java.util.List;

import com.ttukttak.book.dto.BookCategoryDto;

public interface BookService {

	List<BookCategoryDto> findAllBookCategory();

}
