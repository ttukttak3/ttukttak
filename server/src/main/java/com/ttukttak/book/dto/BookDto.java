package com.ttukttak.book.dto;

import java.util.List;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookGrade;
import com.ttukttak.book.entity.BookCategory;
import com.ttukttak.book.entity.BookImage;
import com.ttukttak.book.entity.BookInfo;
import com.ttukttak.book.entity.BookReview;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.rent.entity.Rent;

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
	private BookGrade grade;
	private int deposit;
	private UserDto owner;
	private BookInfo bookInfo;
	private BookCategory bookCategory;
	private TownDto town;
	private List<Rent> rent;
	private double rating;
	private int rentCnt;
	private List<BookReview> review;

	private BookImage thumbnail;

	public BookDto(Book book) {
		this.id = book.getId();
		this.subject = book.getSubject();
		this.content = book.getContent();
		this.deposit = book.getDeposit();
		this.grade = book.getGrade();
		this.owner = new UserDto(book.getOwner());
		this.bookInfo = book.getBookInfo();
		this.bookCategory = book.getBookCategory();
		this.town = new TownDto(book.getTown());
		this.thumbnail = book.getThumbnail();
		this.rating = book.getBookReview().stream().mapToDouble(review -> review.getRating()).average().orElse(0);
		this.review = book.getBookReview();
		this.rentCnt = book.getRent().size();
		this.rent = book.getRent();
	}

}
