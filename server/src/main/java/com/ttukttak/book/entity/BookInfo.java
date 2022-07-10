package com.ttukttak.book.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.common.BaseTimeEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class BookInfo extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(columnDefinition = "DATE")
	private Date publishedDate;

	private int price;

	private String image;

	private String publisher;

	private String author;

	private String isbn;

	@Builder
	public BookInfo(Long id, String name, String description, Date publishedDate, int price, String image,
		String publisher, String author, String isbn) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.publishedDate = publishedDate;
		this.price = price;
		this.image = image;
		this.publisher = publisher;
		this.author = author;
		this.isbn = isbn;
	}

	public static BookInfo of(BookInfoDto bookInfoDto) {
		return BookInfo.builder()
			.name(bookInfoDto.getName())
			.description(bookInfoDto.getDescription())
			.publishedDate(bookInfoDto.getPublishedDate())
			.price(bookInfoDto.getPrice())
			.image(bookInfoDto.getImage())
			.publisher(bookInfoDto.getPublisher())
			.author(bookInfoDto.getAuthor())
			.isbn(bookInfoDto.getIsbn())
			.build();
	}
}
