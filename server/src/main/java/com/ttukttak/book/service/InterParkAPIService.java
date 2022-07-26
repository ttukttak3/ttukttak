package com.ttukttak.book.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.util.stream.Collectors;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.book.dto.InterparkResponse;
import com.ttukttak.common.dto.PageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterParkAPIService {
	private final ObjectMapper mapper;

	@Value("${interpark.book.key}")
	private String key;

	private static final int PAGE_SIZE = 10;

	public PageResponse<BookInfoDto> search(String query, int pageNum) {

		PageResponse<BookInfoDto> pageResponse = new PageResponse<>();
		StringBuffer sb = new StringBuffer();

		try {
			URL url = new URL("https://book.interpark.com/api/"
				+ "search.api?query=" + URLEncoder.encode(query, "UTF-8")
				+ "&key=" + key
				+ "&maxResults=" + PAGE_SIZE
				+ "&start=" + pageNum
				+ "&output=json");
			HttpsURLConnection http = (HttpsURLConnection)url.openConnection();
			http.setRequestProperty("Content-Type", "application/json");
			http.setRequestMethod("GET");
			http.connect();

			InputStreamReader in = new InputStreamReader(http.getInputStream(), "utf-8");
			BufferedReader br = new BufferedReader(in);

			String line;
			while ((line = br.readLine()) != null) {
				sb.append(line).append("\n");
			}

			//도서 조회 반환값 DTO 변환
			InterparkResponse response = mapper.readValue(sb.toString(), InterparkResponse.class);

			br.close();
			in.close();
			http.disconnect();

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
