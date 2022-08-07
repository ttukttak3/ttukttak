package com.ttukttak.book.service;

import java.io.IOException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.book.dto.InterparkResponse;
import com.ttukttak.common.dto.PageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterParkAPIService {
	private final ObjectMapper mapper;
	private final WebClient webClient = WebClient.builder().baseUrl("https://book.interpark.com").build();

	@Value("${interpark.book.key}")
	private String key;

	private static final int PAGE_SIZE = 20;

	public PageResponse<BookInfoDto> search(String query, int pageNum) {

		PageResponse<BookInfoDto> pageResponse = new PageResponse<>();

		try {
			String url = "/api/search.api?query=" + query
				+ "&key=" + key
				+ "&maxResults=" + PAGE_SIZE
				+ "&start=" + pageNum
				+ "&output=json";

			String result = webClient.get().uri(url).accept(MediaType.APPLICATION_JSON).retrieve()
				.bodyToMono(String.class).block();

			//도서 조회 반환값 DTO 변환
			InterparkResponse response = mapper.readValue(result, InterparkResponse.class);

			//페이징 변수 선언
			pageResponse.setPageNumber(response.getPageNumber());
			pageResponse.setPageSize(response.getPageSize());
			pageResponse.setTotalElements(response.getTotalElements());
			pageResponse.setTotalPages(response.getTotalPages());

			//item -> dto
			pageResponse.setContents(
				response.getItem().stream()
					.filter(item -> item.getIsbn() != null)
					.map(BookInfoDto::from)
					.collect(Collectors.toList()));

		} catch (IOException e) {
			pageResponse.setPageNumber(0);
			pageResponse.setPageSize(PAGE_SIZE);
			pageResponse.setTotalElements(Long.parseLong("0"));
			pageResponse.setTotalPages(0);
		}

		return pageResponse;
	}
}
