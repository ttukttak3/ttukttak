package com.ttukttak.book.dto;

import java.time.LocalDateTime;

import com.ttukttak.book.entity.BookReview;
import com.ttukttak.oauth.dto.UserResponse;

import lombok.Builder;
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

	@Builder
	private BookReviewResponse(Long id, String content, double rating, UserResponse reviewer, LocalDateTime createdDate,
		LocalDateTime modifiedDate) {
		super();
		this.id = id;
		this.content = content;
		this.rating = rating;
		this.reviewer = reviewer;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
	}

	public static BookReviewResponse from(BookReview bookReview) {
		return BookReviewResponse.builder()
			.id(bookReview.getId())
			.content(bookReview.getContent())
			.rating(bookReview.getRating())
			.reviewer(UserResponse.from(bookReview.getReviewer()))
			.createdDate(bookReview.getCreatedDate())
			.modifiedDate(bookReview.getModifiedDate())
			.build();
	}

}
