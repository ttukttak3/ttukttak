package com.ttukttak.book.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.repository.BookCategoryRepositroy;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
	private final BookCategoryRepositroy bookCategoryRepositroy;

	private final ModelMapper modelMapper;

	@Override
	public List<BookCategoryDto> findAllBookCategory() {
		return bookCategoryRepositroy.findAll()
			.stream()
			.map(category -> modelMapper.map(category, BookCategoryDto.class))
			.collect(Collectors.toList());
	}

}
