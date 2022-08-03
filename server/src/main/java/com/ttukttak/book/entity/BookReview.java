package com.ttukttak.book.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ttukttak.book.dto.BookReviewDto;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class BookReview extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "TEXT")
	private String content;

	private double rating;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	@ManyToOne
	@JoinColumn(name = "reviewer_id", nullable = true)
	private User reviewer;

	@Builder
	public BookReview(Long id, String content, double rating, Book book, User reviewer) {
		this.id = id;
		this.content = content;
		this.rating = rating;
		this.book = book;
		this.reviewer = reviewer;
	}

	public static BookReview from(BookReviewDto bookReviewDto) {
		Book book = Book.builder().id(bookReviewDto.getBook().getId()).build();
		User reviewer = User.builder().id(bookReviewDto.getReviewer().getId()).build();

		return BookReview.builder()
			.id(bookReviewDto.getId())
			.content(bookReviewDto.getContent())
			.rating(bookReviewDto.getRating())
			.book(book)
			.reviewer(reviewer)
			.build();
	}
}
