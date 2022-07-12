package com.ttukttak.rent.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.UserPrincipal;
import com.ttukttak.rent.dto.RentCard;
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
	public ResponseEntity<PageResponse<RentCard>> getRentList(
		@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
		@RequestParam(defaultValue = "1") int pageNum) {

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(rentService.getRentedList(userPrincipal.getId(), pageNum));
	}

	@GetMapping("/borrow")
	@ApiOperation(value = "차입내역 조회")
	@ApiImplicitParam(name = "pageNum", value = "페이지 번호", required = true, dataType = "int", paramType = "param")
	public ResponseEntity<PageResponse<RentCard>> getBorrowingList(
		@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
		@RequestParam(defaultValue = "1") int pageNum) {

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(rentService.getBorrowedList(userPrincipal.getId(), pageNum));
	}
}
