package com.ttukttak.book.dto;

import com.ttukttak.book.entity.BookReview;
import com.ttukttak.oauth.dto.UserDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookReviewDto {
	private Long id;
	private String content;
	private double rating;
	private BookDto book;
	private UserDto reviewer;

	public BookReviewDto(BookReview bookReview) {
		this.id = bookReview.getId();
		this.content = bookReview.getContent();
		this.rating = bookReview.getRating();
		this.book = BookDto.from(bookReview.getBook());
		this.reviewer = UserDto.from(bookReview.getReviewer());
	}

	@Builder
	private BookReviewDto(Long id, String content, double rating, BookDto book, UserDto reviewer) {
		this.id = id;
		this.content = content;
		this.rating = rating;
		this.book = book;
		this.reviewer = reviewer;
	}

	public static BookReviewDto from(BookReview bookReview) {
		return BookReviewDto.builder()
			.id(bookReview.getId())
			.content(bookReview.getContent())
			.rating(bookReview.getRating())
			.book(BookDto.from(bookReview.getBook()))
			.reviewer(UserDto.from(bookReview.getReviewer()))
			.build();

	}
}
