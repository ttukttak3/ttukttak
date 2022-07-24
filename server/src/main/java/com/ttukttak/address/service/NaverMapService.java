package com.ttukttak.address.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ttukttak.address.dto.CoordinateRequest;
import com.ttukttak.address.dto.TownDto;

@Service
public class NaverMapService {
	private String ReverseGeocodingApi = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc";
	private String GeocodingApi = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode";
	@Value("${naver.map.clientId}")
	private String clientId;
	@Value("${naver.map.clientSecret}")
	private String clientKey;

	public TownDto getReverseGeocoding(CoordinateRequest CoordinateRequest) {

		String api = ReverseGeocodingApi + "?coords=" + CoordinateRequest.getLongitude() + ","
			+ CoordinateRequest.getLatitude()
			+ "&orders=legalcode&output=json";
		StringBuffer sb = new StringBuffer();
		TownDto townDto = new TownDto();

		try {
			URL url = new URL(api);
			HttpsURLConnection http = (HttpsURLConnection)url.openConnection();
			http.setRequestProperty("Content-Type", "application/json");
			http.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
			http.setRequestProperty("X-NCP-APIGW-API-KEY", clientKey);
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
			JSONArray jsonArray = (JSONArray)jsonObject.get("results");
			JSONObject jsonResult = (JSONObject)parser.parse(jsonArray.get(0).toString());

			//TownID값과 동일함.
			JSONObject jsonCode = (JSONObject)jsonResult.get("code");

			//주소
			JSONObject jsonRegion = (JSONObject)jsonResult.get("region");

			//시도
			JSONObject jsonCity = (JSONObject)jsonRegion.get("area1");

			//시군구
			JSONObject jsonDistrict = (JSONObject)jsonRegion.get("area2");

			//읍면동
			JSONObject jsonName = (JSONObject)jsonRegion.get("area3");

			//하위
			JSONObject jsonEtc = (JSONObject)jsonRegion.get("area4");

			townDto = TownDto.builder()
				.id(Long.parseLong(jsonCode.get("id").toString()))
				.city(jsonCity.get("name").toString())
				.district(jsonDistrict.get("name").toString())
				.name(jsonName.get("name").toString())
				.etc(jsonEtc.get("name").toString())
				.build();

			br.close();
			in.close();
			http.disconnect();

		} catch (IOException e) {} catch (ParseException e) {}

		return townDto;
	}

	public CoordinateRequest getGeocoding(String query) {
		CoordinateRequest coordinateRequest = new CoordinateRequest();
		try {
			String addr = URLEncoder.encode(query, "utf-8");
			String api = GeocodingApi + "?query=" + addr;
			StringBuffer sb = new StringBuffer();
			URL url = new URL(api);
			HttpsURLConnection http = (HttpsURLConnection)url.openConnection();
			http.setRequestProperty("Content-Type", "application/json");
			http.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
			http.setRequestProperty("X-NCP-APIGW-API-KEY", clientKey);
			http.setRequestMethod("GET");
			http.connect();

			InputStreamReader in = new InputStreamReader(http.getInputStream(), "utf-8");
			BufferedReader br = new BufferedReader(in);

			String line;
			while ((line = br.readLine()) != null) {
				sb.append(line).append("\n");
			}

			JSONParser parser = new JSONParser();
			JSONObject jsonObject;
			JSONObject jsonObject2;
			JSONArray jsonArray;

			jsonObject = (JSONObject)parser.parse(sb.toString());
			jsonArray = (JSONArray)jsonObject.get("addresses");
			for (int i = 0; i < jsonArray.size(); i++) {
				jsonObject2 = (JSONObject)jsonArray.get(i);
				if (null != jsonObject2.get("x")) {
					coordinateRequest.setLongitude(Double.parseDouble(jsonObject2.get("x").toString()));
				}
				if (null != jsonObject2.get("y")) {
					coordinateRequest.setLatitude(Double.parseDouble(jsonObject2.get("y").toString()));
				}
			}

			br.close();
			in.close();
			http.disconnect();

		} catch (IOException e) {} catch (ParseException e) {}

		return coordinateRequest;
	}
}
