package com.ttukttak.book.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ttukttak.book.dto.BookReviewDto;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class BookReview extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "TEXT")
	private String content;

	private int grade;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	@ManyToOne
	@JoinColumn(name = "reviewer_id")
	private User reviewer;

	@Builder
	public BookReview(Long id, String content, int grade, Book book, User reviewer) {
		this.id = id;
		this.content = content;
		this.grade = grade;
		this.book = book;
		this.reviewer = reviewer;
	}

	public static BookReview of(BookReviewDto bookReviewDto) {
		Book book = Book.builder().id(bookReviewDto.getBook().getId()).build();
		User reviewer = User.builder().id(bookReviewDto.getReviewer().getId()).build();

		return BookReview.builder()
			.id(bookReviewDto.getId())
			.content(bookReviewDto.getContent())
			.grade(bookReviewDto.getGrade())
			.book(book)
			.reviewer(reviewer)
			.build();
	}
}