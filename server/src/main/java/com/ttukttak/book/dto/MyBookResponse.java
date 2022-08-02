package com.ttukttak.book.dto;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookGrade;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MyBookResponse {
	private Long id;
	private String imageUrl;
	private BookGrade grade;
	private Boolean isHide;

	@Builder
	private MyBookResponse(Long id, String imageUrl, BookGrade grade, Boolean isHide) {
		this.id = id;
		this.imageUrl = imageUrl;
		this.grade = grade;
		this.isHide = isHide;
	}

	public static MyBookResponse from(Book book) {
		return MyBookResponse.builder()
			.id(book.getId())
			.imageUrl(book.getTumbnailImageUrl())
			.grade(book.getGrade())
			.isHide(book.getIsHide())
			.build();
	}

}
