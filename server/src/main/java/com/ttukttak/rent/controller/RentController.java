package com.ttukttak.rent.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.UserPrincipal;
import com.ttukttak.rent.dto.RentRequest;
import com.ttukttak.rent.dto.RentResponse;
import com.ttukttak.rent.service.RentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "/api/v1/rent", description = "대여 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rent")
public class RentController {

	private final RentService rentService;

	@GetMapping
	@ApiOperation(value = "대여내역 조회")
	@ApiImplicitParam(name = "pageNum", value = "페이지 번호", required = true, dataType = "int", paramType = "param")
	public ResponseEntity<PageResponse<RentResponse>> getRentList(
		@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
		@RequestParam(defaultValue = "1") int pageNum) {

		return ResponseEntity
			.ok(rentService.getRentedList(userPrincipal.getId(), pageNum));
	}

	@GetMapping("/borrow")
	@ApiOperation(value = "차입내역 조회")
	@ApiImplicitParam(name = "pageNum", value = "페이지 번호", required = true, dataType = "int", paramType = "param")
	public ResponseEntity<PageResponse<RentResponse>> getBorrowingList(
		@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
		@RequestParam(defaultValue = "1") int pageNum) {

		return ResponseEntity
			.ok(rentService.getBorrowedList(userPrincipal.getId(), pageNum));
	}

	@GetMapping("/{rentId}")
	@ApiOperation(value = "대여 상세조회")
	public ResponseEntity<RentResponse> getRentById(@PathVariable Long rentId) {
		return ResponseEntity.ok(rentService.getRentById(rentId));
	}

	//TODO: 차입자만 요청할 수 있는지 확인 필요
	@PostMapping
	public ResponseEntity<RentResponse> addRent(@RequestBody RentRequest request) {
		RentResponse rentResponse = rentService.addRent(request);

		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{rentId}")
			.buildAndExpand(rentResponse.getId())
			.toUri();

		return ResponseEntity
			.created(location)
			.body(rentResponse);

	}

	@PatchMapping("/{rentId}/return")
	public ResponseEntity<RentResponse> changeRentStatus(@PathVariable Long rentId) {
		return ResponseEntity
			.ok(rentService.changeRentStatus(rentId));
	}

	//TODO: 연장하기

	// @PostMapping("/{rentId}/extend")
	// public ResponseEntity<ExtendRequest> addExtend(@PathVariable Long rentId, @RequestBody ExtendRequest request) {
	// 	RentResponse rentResponse = rentService.addRent(request);
	//
	// 	URI location = ServletUriComponentsBuilder
	// 		.fromCurrentRequest()
	// 		.path("/{rentId}")
	// 		.buildAndExpand(rentResponse.getId())
	// 		.toUri();
	//
	// 	return ResponseEntity
	// 		.created(location)
	// 		.body(rentResponse);
	//
	// }
}
