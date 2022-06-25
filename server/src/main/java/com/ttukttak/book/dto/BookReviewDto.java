package com.ttukttak.book.dto;

import com.ttukttak.book.entity.BookReview;
import com.ttukttak.oauth.dto.UserDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookReviewDto {
	private Long id;
	private String content;
	private int grade;
	private BookDto book;
	private UserDto reviewer;

	public BookReviewDto(BookReview bookReview) {
		this.id = bookReview.getId();
		this.content = bookReview.getContent();
		this.grade = bookReview.getGrade();
		this.book = new BookDto(bookReview.getBook());
		this.reviewer = new UserDto(bookReview.getReviewer());
	}
}
