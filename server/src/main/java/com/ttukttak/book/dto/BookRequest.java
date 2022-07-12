package com.ttukttak.book.dto;

import com.ttukttak.book.entity.Book.BookStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookRequest {
	private int pageNum;
	private String order;
	private BookStatus status;
	private Long townId;
	private Long categoryId;
	private String query;
}
