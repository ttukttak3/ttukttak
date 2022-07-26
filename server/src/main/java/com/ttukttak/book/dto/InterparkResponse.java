package com.ttukttak.book.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class InterparkResponse {
	@JsonProperty("startIndex")
	private int pageNumber;

	@JsonProperty("totalResults")
	private Long totalElements;

	@JsonProperty("maxResults")
	private int pageSize;

	private List<InterparkItemResponse> item = new ArrayList<>();

	public int getTotalPages() {
		return (int)Math.ceil((double)this.totalElements / (double)this.pageSize);
	}
}
