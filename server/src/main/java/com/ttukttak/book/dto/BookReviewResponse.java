package com.ttukttak.book.dto;

import java.time.LocalDateTime;

import com.ttukttak.book.entity.BookReview;
import com.ttukttak.oauth.dto.UserResponse;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookReviewResponse {
	private Long id;
	private String content;
	private double rating;
	private UserResponse reviewer;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;

	public BookReviewResponse(BookReview bookReview) {
		this.id = bookReview.getId();
		this.content = bookReview.getContent();
		this.rating = bookReview.getRating();
		this.reviewer = new UserResponse(bookReview.getReviewer());
		this.createdDate = bookReview.getCreatedDate();
		this.modifiedDate = bookReview.getModifiedDate();
	}
}
