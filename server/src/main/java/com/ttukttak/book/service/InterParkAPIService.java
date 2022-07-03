package com.ttukttak.book.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ttukttak.book.dto.BookInfoDto;
import com.ttukttak.common.dto.PageResponse;

@Service
public class InterParkAPIService {
	@Value("${interpark.book.key}")
	private String key;

	private static final int PAGE_SIZE = 10;

	public PageResponse<BookInfoDto> search(String query, int pageNum) {

		PageResponse<BookInfoDto> pageResponse = new PageResponse<>();
		StringBuffer sb = new StringBuffer();
		List<BookInfoDto> bookList = new ArrayList<BookInfoDto>();

		try {
			URL url = new URL("https://book.interpark.com/api/"
				+ "search.api?query=" + query
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

			JSONParser parser = new JSONParser();
			JSONObject jsonObject = (JSONObject)parser.parse(sb.toString());
			JSONArray jsonItems = (JSONArray)jsonObject.get("item");

			//페이지번호
			pageResponse.setPageNumber(Integer.parseInt(jsonObject.get("startIndex").toString()));
			//총검색결과
			pageResponse.setTotalPages(Integer.parseInt(jsonObject.get("totalResults").toString()));
			//페이지당결과개수
			pageResponse.setPageSize(Integer.parseInt(jsonObject.get("maxResults").toString()));

			//Date 포맷터
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
			//도서 리스트
			for (int i = 0; i < jsonItems.size(); i++) {
				JSONObject item = (JSONObject)jsonItems.get(i);
				BookInfoDto book = new BookInfoDto();

				book.setName(item.get("title").toString());
				book.setDescription(item.get("description").toString());
				try {
					book.setPublishedDate(formatter.parse(item.get("pubDate").toString()));
				} catch (Exception e) {
					book.setPublishedDate(null);
				}
				book.setPrice(Integer.parseInt(item.get("priceStandard").toString()));
				book.setImage(item.get("coverLargeUrl").toString());
				//사용자가 직접 카테고리를 지정하기 때문에 주석처리.
				//book.setCategoryId(item.get("categoryId").toString());
				book.setPublisher(item.get("publisher").toString());
				book.setAuthor(item.get("author").toString());
				book.setIsbn(item.get("isbn").toString());

				bookList.add(book);

			}

			pageResponse.setContents(bookList);

			br.close();
			in.close();
			http.disconnect();

		} catch (IOException e) {
		} catch (ParseException e) {
		}

		return pageResponse;
	}
}
