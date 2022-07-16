package com.ttukttak.book.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookGrade;
import com.ttukttak.book.entity.BookCategory;
import com.ttukttak.oauth.dto.UserDto;

import lombok.Builder;
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
	private BookInfoDto bookInfo;
	private BookCategory bookCategory;
	private TownDto bookTown;
	private List<BookReviewDto> review;

	private BookImageDto thumbnail;
	private List<BookImageDto> imageUrls;

	@Builder
	private BookDto(Long id, String subject, String content, BookGrade grade, int deposit, UserDto owner,
		BookInfoDto bookInfo, BookCategory bookCategory, TownDto bookTown, List<BookReviewDto> review,
		BookImageDto thumbnail,
		List<BookImageDto> imageUrls) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.grade = grade;
		this.deposit = deposit;
		this.owner = owner;
		this.bookInfo = bookInfo;
		this.bookCategory = bookCategory;
		this.bookTown = bookTown;
		this.review = review;
		this.thumbnail = thumbnail;
		this.imageUrls = imageUrls;
	}

	public static BookDto from(Book book) {
		return BookDto.builder()
			.id(book.getId())
			.subject(book.getSubject())
			.content(book.getContent())
			.deposit(book.getDeposit())
			.grade(book.getGrade())
			.owner(UserDto.from(book.getOwner()))
			.bookInfo(BookInfoDto.from(book.getBookInfo()))
			.bookCategory(book.getBookCategory())
			.bookTown(TownDto.from(book.getTown()))
			.review(book.getBookReview().stream().map(BookReviewDto::from).collect(Collectors.toList()))
			.thumbnail(BookImageDto.from(book.getThumbnail()))
			.imageUrls(book.getImages().stream().map(BookImageDto::from).collect(Collectors.toList()))
			.build();
	}

}
