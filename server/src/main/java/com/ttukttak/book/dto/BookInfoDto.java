package com.ttukttak.book.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.ttukttak.book.entity.BookInfo;

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

	public BookInfoDto(BookInfo bookInfo) {
		this.name = bookInfo.getName();
		this.description = bookInfo.getDescription();
		this.publishedDate = bookInfo.getPublishedDate();
		this.price = bookInfo.getPrice();
		this.image = bookInfo.getImage();
		this.publisher = bookInfo.getPublisher();
		this.author = bookInfo.getAuthor();
		this.isbn = bookInfo.getIsbn();
	}

	public BookInfoDto(BookUploadRequest uploadRequest) throws ParseException {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		this.name = uploadRequest.getName();
		this.description = uploadRequest.getDescription();
		this.publishedDate = formatter.parse(uploadRequest.getPublishedDate().toString());
		this.price = uploadRequest.getPrice();
		this.image = uploadRequest.getImage();
		this.publisher = uploadRequest.getPublisher();
		this.author = uploadRequest.getAuthor();
		this.isbn = uploadRequest.getIsbn();
	}

}
