package com.ttukttak.book.dto;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookStatus;

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
	private double grade;
	private String thumbnail;
	private int rentCnt;

	public BookResponse(Book book) {
		this.id = book.getId();
		this.subject = book.getSubject();
		this.content = book.getContent();
		this.author = book.getAuthor();
		this.status = book.getStatus();
		this.deposit = book.getDeposit();
		this.address = new TownDto(book.getTown()).getAddress();
		this.thumbnail = book.getThumbnail().getImageUrl();
		this.grade = book.getBookReview().stream().mapToDouble(review -> review.getGrade()).average().orElse(0);
		this.rentCnt = book.getRent().size();
	}
}
