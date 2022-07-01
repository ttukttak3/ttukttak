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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(value = "/api/address", description = "지역 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/address")
public class AddressController {
	private final AddressService addressService;
	private final NaverMapService reverseGeocoding;

	@ApiImplicitParam(name = "CoordinateRequest", value = "위도 경도 Request", required = true, dataType = "object", paramType = "body")
	@ApiOperation(value = "위도, 경도의 지역 조회", notes = "위도와 경도를 받아 ReverseGeocoding을 통해 해당 주소를 반환한다.")
	@GetMapping("/location")
	public ResponseEntity<TownDto> getLocation(CoordinateRequest coordinateRequest) {

		TownDto townDto = reverseGeocoding.getReverseGeocoding(coordinateRequest);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(townDto);
	}

	@ApiImplicitParam(name = "townId", value = "지역 ID", required = true, dataType = "Long", paramType = "param")
	@ApiOperation(value = "인근 지역 조회", notes = "타운id를 받아와 해당 범위에 있는 주소를 반환한다.")
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

	@ApiImplicitParam(name = "townName", value = "지역동 Name", required = true, dataType = "String", paramType = "param")
	@ApiOperation(value = "지역 조회(지역동 검색)", notes = "동,면을 like로 검색한 결과를 반환.")
	@GetMapping("/search")
	public ResponseEntity<List<TownDto>> getSearch(@RequestParam
	String townName) {

		List<TownDto> townList = addressService.getSearchTown(townName);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(townList);
	}

	@ApiImplicitParam(name = "townId", value = "지역 Id", required = true, dataType = "Long", paramType = "path")
	@ApiOperation(value = "지역 조회(id)", notes = "townId를 받아 데이터 반환")
	@GetMapping("/{townId}")
	public ResponseEntity<TownDto> getSearch(@PathVariable("townId")
	Long townId) {

		TownDto townDto = addressService.getById(townId);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(townDto);
	}
}
