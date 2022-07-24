package com.ttukttak.book.dto;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookGrade;
import com.ttukttak.book.entity.Book.BookStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookResponse {
	private Long id;
	private String subject;
	private String content;
	private String author;
	private int deposit;
	private BookStatus status;
	private String address;
	private BookGrade grade;
	private double rating;
	private String thumbnail;
	private int rentCnt;

	@Builder
	private BookResponse(Long id, String subject, String content, String author, int deposit, BookStatus status,
		String address, BookGrade grade, double rating, String thumbnail, int rentCnt) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.author = author;
		this.deposit = deposit;
		this.status = status;
		this.address = address;
		this.grade = grade;
		this.rating = rating;
		this.thumbnail = thumbnail;
		this.rentCnt = rentCnt;
	}

	public static BookResponse from(Book book) {
		return BookResponse.builder()
			.id(book.getId())
			.subject(book.getSubject())
			.content(book.getContent())
			.author(book.getAuthor())
			.status(book.getStatus())
			.deposit(book.getDeposit())
			.address(TownDto.from(book.getTown()).getAddress())
			.thumbnail(book.getTumbnailImageUrl())
			.grade(book.getGrade())
			.rating(book.getBookReview().stream().mapToDouble(review -> review.getRating()).average().orElse(0))
			.rentCnt(book.getRent().size())
			.build();

	}

}
