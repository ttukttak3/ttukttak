package com.ttukttak.book.dto;

import javax.validation.constraints.NotBlank;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InterParkRequest {

	@ApiModelProperty(example = "도서 검색어")
	@NotBlank
	private String query;

	@ApiModelProperty(example = "페이지 번호")
	private Integer start = 1;

	@ApiModelProperty(example = "한 페이지당 결과 개수")
	private Integer size = 10;
}
