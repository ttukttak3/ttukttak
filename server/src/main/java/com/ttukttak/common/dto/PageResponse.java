package com.ttukttak.common.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PageResponse<T> {

	private List<T> contents = new ArrayList<>();

	private Integer pageNumber;

	private Integer pageSize;

	private Integer totalPages;

	private Integer totalElements;

	@Builder
	public PageResponse(List<T> contents, Integer pageNumber, Integer pageSize, Integer totalPages,
		Integer totalElements) {
		this.contents = contents;
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
		this.totalPages = totalPages;
		this.totalElements = totalElements;
	}
}
