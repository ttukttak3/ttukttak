package com.ttukttak.book.dto;

import com.ttukttak.book.entity.BookCategory;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookCategoryDto {
	private Long id;
	private String name;

	public BookCategoryDto(BookCategory bookCategory) {
		this.id = bookCategory.getId();
		this.name = bookCategory.getName();
	}
}
