package com.ttukttak.book.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class InterparkItemResponse {
	@JsonProperty("title")
	private String name;

	@JsonProperty("description")
	private String description;

	@JsonProperty("pubDate")
	private String publishedDate;

	@JsonProperty("priceStandard")
	private int price;

	@JsonProperty("coverLargeUrl")
	private String image;

	@JsonProperty("publisher")
	private String publisher;

	@JsonProperty("author")
	private String author;

	@JsonProperty("isbn")
	private String isbn;

}
