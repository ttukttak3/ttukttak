package com.ttukttak.book.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ttukttak.book.dto.BookImageDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BookImage implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String imageUrl;

	@JoinColumn(name = "book_id")
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Book book;

	@Builder
	public BookImage(Long id, String imageUrl, Book book) {
		this.id = id;
		this.imageUrl = imageUrl;
		this.book = book;
	}

	public static BookImage from(BookImageDto bookImageDto) {
		return BookImage.builder()
			.id(bookImageDto.getId())
			.imageUrl(bookImageDto.getImageUrl())
			.build();
	}

}
