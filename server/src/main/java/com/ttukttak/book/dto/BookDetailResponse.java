package com.ttukttak.book.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookGrade;
import com.ttukttak.book.entity.Book.BookStatus;
import com.ttukttak.book.entity.BookCategory;
import com.ttukttak.book.entity.BookReview;
import com.ttukttak.oauth.dto.UserResponse;

import lombok.Builder;
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
	private String author;
	private BookGrade grade;
	private BookStatus status;
	private Boolean isHide;
	private int deposit;
	private UserResponse owner;
	private BookInfoDto bookInfo;
	private BookCategory bookCategory;
	private TownDto bookTown;
	private double rating;
	private int rentCnt;
	private List<BookReviewResponse> review;

	private BookImageDto thumbnail;
	private List<BookImageDto> bookImages;

	@Builder
	private BookDetailResponse(Long id, String subject, String content, String author, BookStatus status,
		BookGrade grade, Boolean isHide, int deposit, UserResponse owner, BookInfoDto bookInfo,
		BookCategory bookCategory, TownDto bookTown, double rating, int rentCnt,
		List<BookReviewResponse> review, BookImageDto thumbnail, List<BookImageDto> bookImages) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.author = author;
		this.status = status;
		this.grade = grade;
		this.isHide = isHide;
		this.deposit = deposit;
		this.owner = owner;
		this.bookInfo = bookInfo;
		this.bookCategory = bookCategory;
		this.bookTown = bookTown;
		this.rating = rating;
		this.rentCnt = rentCnt;
		this.review = review;
		this.thumbnail = thumbnail;
		this.bookImages = bookImages;
	}

	public static BookDetailResponse from(Book book) {
		return BookDetailResponse.builder()
			.id(book.getId())
			.subject(book.getSubject())
			.content(book.getContent())
			.author(book.getAuthor())
			.status(book.getStatus())
			.grade(book.getGrade())
			.isHide(book.getIsHide())
			.deposit(book.getDeposit())
			.owner(UserResponse.from(book.getOwner()))
			.bookInfo(BookInfoDto.from(book.getBookInfo()))
			.bookCategory(book.getBookCategory())
			.bookTown(TownDto.from(book.getTown()))
			.rating(book.getBookReview().stream().mapToDouble(BookReview::getRating).average().orElse(0))
			.rentCnt(book.getRent().size())
			.review(book.getBookReview().stream().map(BookReviewResponse::from).collect(Collectors.toList()))
			.thumbnail(BookImageDto.from(book.getThumbnail()))
			.bookImages(book.getImages().stream().map(BookImageDto::from).collect(Collectors.toList()))
			.build();
	}

}
