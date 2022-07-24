package com.ttukttak.book.dto;

import com.ttukttak.book.entity.BookCategory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookCategoryDto {
	private Long id;
	private String name;

	@Builder
	private BookCategoryDto(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public static BookCategoryDto from(BookCategory bookCategory) {
		return BookCategoryDto.builder()
			.id(bookCategory.getId())
			.name(bookCategory.getName())
			.build();
	}

}
