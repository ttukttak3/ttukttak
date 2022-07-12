package com.ttukttak.rent.dto;

import com.ttukttak.book.entity.Book;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class RentedBook {
	private static final int RENT_PRICE = 2000;

	private String subject;
	private String author;
	private String imageUrl;
	private int deposit;
	private Book.BookStatus status;

	public int getRentPrice() {
		return RENT_PRICE;
	}

	@Builder
	private RentedBook(String subject, String author, String imageUrl, int deposit,
		Book.BookStatus status) {
		this.subject = subject;
		this.author = author;
		this.imageUrl = imageUrl;
		this.deposit = deposit;
		this.status = status;
	}

	public static RentedBook from(Book book) {
		return RentedBook.builder()
			.subject(book.getSubject())
			.author(book.getAuthor())
			.imageUrl(book.getThumbnail().getImageUrl())
			.deposit(book.getDeposit())
			.status(book.getStatus())
			.build();
	}
}
