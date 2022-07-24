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

	@Builder
	private MyBookResponse(Long id, String imageUrl, BookGrade grade) {
		this.id = id;
		this.imageUrl = imageUrl;
		this.grade = grade;
	}

	public static MyBookResponse from(Book book) {
		return MyBookResponse.builder()
			.id(book.getId())
			.imageUrl(book.getThumbnail() != null ? book.getThumbnail().getImageUrl() : "")
			.grade(book.getGrade())
			.build();
	}

}
