package com.ttukttak.book.dto;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.BookCategory;
import com.ttukttak.book.entity.BookInfo;
import com.ttukttak.book.entity.BookStatus;
import com.ttukttak.oauth.dto.UserDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookDto {
	private Long id;
	private String subject;
	private String content;
	private int deposit;
	private BookStatus status;
	private UserDto owner;
	private BookInfo bookInfo;
	private BookCategory bookCategory;

	public BookDto(Book book) {
		this.id = book.getId();
		this.subject = book.getSubject();
		this.content = book.getContent();
		this.deposit = book.getDeposit();
		this.status = book.getStatus();
		this.owner = new UserDto(book.getOwner());
		this.bookInfo = book.getBookInfo();
		this.bookCategory = book.getBookCategory();
	}

}
