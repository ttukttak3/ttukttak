package com.ttukttak.address.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

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
public class ReverseGeocoding {
	private String apiurl = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc";
	@Value("${naver.map.clientId}")
	private String clientId;
	@Value("${naver.map.clientSecret}")
	private String clientKey;

	public TownDto getLocation(CoordinateRequest CoordinateRequest) {

		String api = apiurl + "?coords=" + CoordinateRequest.getLongitude() + "," + CoordinateRequest.getLatitude()
			+ "&orders=legalcode&output=json";
		StringBuffer sb = new StringBuffer();
		TownDto townDto = new TownDto();

		System.out.println("clientId:" + clientId + " , clientKey : " + clientKey);

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
			townDto.setId(Long.parseLong(jsonCode.get("id").toString()));

			//주소
			JSONObject jsonRegion = (JSONObject)jsonResult.get("region");

			//시도
			JSONObject jsonCity = (JSONObject)jsonRegion.get("area1");
			townDto.setCity(jsonCity.get("name").toString());

			//시군구
			JSONObject jsonDistrict = (JSONObject)jsonRegion.get("area2");
			townDto.setDistrict(jsonDistrict.get("name").toString());

			//읍면동
			JSONObject jsonName = (JSONObject)jsonRegion.get("area3");
			townDto.setName(jsonName.get("name").toString());

			//하위
			JSONObject jsonEtc = (JSONObject)jsonRegion.get("area4");
			townDto.setEtc(jsonEtc.get("name").toString());

			townDto.setAdress(townDto.getCity(), townDto.getDistrict(), townDto.getName(), townDto.getEtc());

			br.close();
			in.close();
			http.disconnect();

		} catch (IOException e) {} catch (ParseException e) {}

		return townDto;
	}
}
