package com.ttukttak.book.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.ttukttak.book.entity.BookInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookInfoDto {
	private String name;
	private String description;
	private Date publishedDate;
	private int price;
	private String image;
	private String publisher;
	private String author;
	private String isbn;

	@Builder
	private BookInfoDto(String name, String description, Date publishedDate, int price, String image, String publisher,
		String author, String isbn) {
		this.name = name;
		this.description = description;
		this.publishedDate = publishedDate;
		this.price = price;
		this.image = image;
		this.publisher = publisher;
		this.author = author;
		this.isbn = isbn;
	}

	public static BookInfoDto from(BookInfo bookInfo) {
		//직접등록인 경우에는 NULL
		if (bookInfo == null) {
			return new BookInfoDto();
		}
		return BookInfoDto.builder()
			.name(bookInfo.getName())
			.description(bookInfo.getDescription())
			.publishedDate(bookInfo.getPublishedDate())
			.price(bookInfo.getPrice())
			.image(bookInfo.getImage())
			.publisher(bookInfo.getPublisher())
			.author(bookInfo.getAuthor())
			.isbn(bookInfo.getIsbn())
			.build();
	}

	public static BookInfoDto from(BookUploadRequest uploadRequest) throws ParseException {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		return BookInfoDto.builder()
			.name(uploadRequest.getName())
			.description(uploadRequest.getDescription())
			.publishedDate(formatter.parse(uploadRequest.getPublishedDate().toString()))
			.price(uploadRequest.getPrice())
			.image(uploadRequest.getImage())
			.publisher(uploadRequest.getPublisher())
			.author(uploadRequest.getAuthor())
			.isbn(uploadRequest.getIsbn())
			.build();
	}

	public static BookInfoDto from(InterparkItemResponse itemResponse) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		Date publishedDate = new Date();
		try {
			publishedDate = formatter.parse(itemResponse.getPublishedDate());
		} catch (Exception e) {}

		return BookInfoDto.builder()
			.name(itemResponse.getName())
			.description(itemResponse.getDescription())
			.publishedDate(publishedDate)
			.price(itemResponse.getPrice())
			.image(itemResponse.getImage())
			.publisher(itemResponse.getPublisher())
			.author(itemResponse.getAuthor())
			.isbn(itemResponse.getIsbn())
			.build();
	}

}
