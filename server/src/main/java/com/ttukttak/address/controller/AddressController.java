package com.ttukttak.address.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.address.dto.CoordinateRequest;
import com.ttukttak.address.dto.TownDto;
import com.ttukttak.address.service.AddressService;
import com.ttukttak.address.service.NaverMapService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/address")
public class AddressController {
	private final AddressService addressService;
	private final NaverMapService reverseGeocoding;

	/*
	 * 위도와 경도를 받아 ReverseGeocoding을 통해 해당 주소를 반환한다.
	 */
	@GetMapping("/location")
	public ResponseEntity<TownDto> getLocation(CoordinateRequest coordinateRequest) {

		TownDto townDto = reverseGeocoding.getReverseGeocoding(coordinateRequest);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(townDto);
	}

	/*
	 * 타운id를 받아와 해당 범위에 있는 주소를 반환한다.
	 */
	@GetMapping("/neartown")
	public ResponseEntity<List<TownDto>> getNearTown(@RequestParam
	Long townId) {
		/*
		 * 범위 기본 값 3
		 */
		double ranged = 3.0;

		List<TownDto> townList = addressService.getNearTown(townId, ranged);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(townList);
	}

	/*
	 * 동,면을 like로 검색한 결과를 반환.
	 */
	@GetMapping("/search")
	public ResponseEntity<List<TownDto>> getSearch(@RequestParam
	String townName) {

		List<TownDto> townList = addressService.getSearchTown(townName);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(townList);
	}

	/*
	 * townId를 받아 데이터 반환
	 */
	@GetMapping("/{townId}")
	public ResponseEntity<TownDto> getSearch(@PathVariable("townId")
	Long townId) {

		TownDto townDto = addressService.getById(townId);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(townDto);
	}
}
