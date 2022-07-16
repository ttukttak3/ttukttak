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
import com.ttukttak.rent.dto.CreateRentRequest;
import com.ttukttak.rent.dto.ExtendResponse;
import com.ttukttak.rent.dto.RentResponse;
import com.ttukttak.rent.service.RentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "/api/v1", description = "대여 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class RentController {

	private final RentService rentService;

	@GetMapping("/users/{userId}/rent")
	@ApiOperation(value = "대여내역 조회")
	@ApiImplicitParam(name = "pageNum", value = "페이지 번호", required = true, dataType = "int", paramType = "param")
	public ResponseEntity<PageResponse<RentResponse>> getRentList(
		@PathVariable Long userId,
		@RequestParam(defaultValue = "1") int pageNum) {

		return ResponseEntity.ok(rentService.getRentedList(userId, pageNum));
	}

	@GetMapping("/users/{userId}/rent/borrow")
	@ApiOperation(value = "차입내역 조회")
	@ApiImplicitParam(name = "pageNum", value = "페이지 번호", required = true, dataType = "int", paramType = "param")
	public ResponseEntity<PageResponse<RentResponse>> getBorrowingList(
		@PathVariable Long userId,
		@RequestParam(defaultValue = "1") int pageNum) {

		return ResponseEntity.ok(rentService.getBorrowedList(userId, pageNum));
	}

	@GetMapping("/rent/{rentId}")
	@ApiOperation(value = "대여 상세조회")
	public ResponseEntity<RentResponse> getRentById(@PathVariable Long rentId) {
		return ResponseEntity.ok(rentService.getRentById(rentId));
	}

	@PostMapping("/rent")
	public ResponseEntity<RentResponse> addRent(
		@ApiIgnore
		@CurrentUser
			UserPrincipal userPrincipal, @RequestBody CreateRentRequest request) {

		RentResponse rentResponse = rentService.addRent(request, userPrincipal.getId());

		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{rentId}")
			.buildAndExpand(rentResponse.getId())
			.toUri();

		return ResponseEntity
			.created(location)
			.body(rentResponse);

	}

	@PatchMapping("/rent/{rentId}/return")
	public ResponseEntity<RentResponse> changeRentStatus(
		@ApiIgnore
		@CurrentUser
			UserPrincipal userPrincipal, @PathVariable Long rentId) {

		return ResponseEntity.ok(rentService.changeRentStatus(rentId, userPrincipal.getId()));
	}

	@PostMapping("/rent/{rentId}/extend")
	public ResponseEntity<ExtendResponse> addExtend(
		@ApiIgnore
		@CurrentUser
			UserPrincipal userPrincipal, @PathVariable Long rentId) {

		return ResponseEntity.ok(rentService.addExtend(rentId, userPrincipal.getId()));

	}
}
