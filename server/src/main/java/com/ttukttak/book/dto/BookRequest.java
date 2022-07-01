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
	private int pageNo;
	private String order;
	private BookStatus status;
	//townId가 없을 경우 기본값인 1111011900 (서울시 종로구 세종로)
	private Long townId = new Long("1111011900");
	private String query;
}
