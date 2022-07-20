package com.ttukttak.book.dto;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.ttukttak.book.entity.Book.BookGrade;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookUploadRequest {
	//BookInfo API 입력 정보
	@ApiModelProperty(example = "API 도서명")
	private String name;
	@ApiModelProperty(example = "API 도서 설명")
	private String description;
	@ApiModelProperty(example = "API 도서 출판일")
	private String publishedDate;
	@ApiModelProperty(example = "API 도서 정가")
	private int price = 0;
	@ApiModelProperty(example = "API 도서 이미지")
	private String image;
	@ApiModelProperty(example = "API 도서 출판사")
	private String publisher;
	@ApiModelProperty(example = "API 도서 번호")
	private String isbn;

	//API와 공통 영역
	@ApiModelProperty(example = "저자명")
	@NotNull
	private String author;

	//Book 등록정보
	@ApiModelProperty(example = "대여자의 말")
	private String content;

	@ApiModelProperty(example = "보증금")
	@NotNull
	private int deposit;

	@ApiModelProperty(example = "도서명 API 도서명과 같음")
	@NotEmpty
	private String subject;

	@ApiModelProperty(example = "카테고리 ID")
	@NotEmpty
	private Long bookCategoryId;

	@ApiModelProperty(example = "대표 이미지명, API 조회시 API 이미지명으로!")
	@NotNull
	private String thumbnail;

	@ApiModelProperty(example = "도서 등급")
	@NotEmpty
	private BookGrade grade;

	//Book 이미지정보
	@ApiModelProperty(example = "이미지목록")
	private List<BookImageDto> bookImages = new ArrayList<>();
}
