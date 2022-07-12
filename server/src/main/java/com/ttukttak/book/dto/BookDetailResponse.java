package com.ttukttak.book.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookGrade;
import com.ttukttak.book.entity.BookCategory;
import com.ttukttak.book.entity.BookInfo;
import com.ttukttak.book.entity.BookReview;
import com.ttukttak.oauth.dto.UserResponse;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookDetailResponse {
	private Long id;
	private String subject;
	private String content;
	private BookGrade grade;
	private int deposit;
	private UserResponse owner;
	private BookInfo bookInfo;
	private BookCategory bookCategory;
	private TownDto bookTown;
	private double rating;
	private int rentCnt;
	private List<BookReviewResponse> review;

	private BookImageDto thumbnail;
	private List<BookImageDto> bookImages;

	public BookDetailResponse(Book book) {
		this.id = book.getId();
		this.subject = book.getSubject();
		this.content = book.getContent();
		this.deposit = book.getDeposit();
		this.grade = book.getGrade();
		this.owner = new UserResponse(book.getOwner());
		this.bookInfo = book.getBookInfo();
		this.bookCategory = book.getBookCategory();
		this.bookTown = new TownDto(book.getTown());
		this.thumbnail = BookImageDto.from(book.getThumbnail());
		this.bookImages = book.getImages().stream().map(BookImageDto::from).collect(Collectors.toList());
		this.rating = book.getBookReview().stream().mapToDouble(BookReview::getRating).average().orElse(0);
		this.review = book.getBookReview().stream().map(BookReviewResponse::from).collect(Collectors.toList());
		this.rentCnt = book.getRent().size();
	}
}
