package com.ttukttak.oauth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.common.exception.UnauthChangeException;
import com.ttukttak.oauth.dto.ProfileRequest;
import com.ttukttak.oauth.dto.SignUpRequest;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.UserPrincipal;
import com.ttukttak.oauth.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "/api/v1/oauth", description = "유저 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/oauth")
public class OauthController {

	private final UserService userService;

	@ApiOperation(value = "로그인한 유저정보 조회")
	@GetMapping("/profile")
	public ResponseEntity<UserDto> getCurrentUser(
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {

		return ResponseEntity.ok(userService.getById(userPrincipal.getId()));
	}

	@ApiImplicitParam(name = "nickname", value = "닉네임", required = true, dataType = "String", paramType = "Param")
	@ApiOperation(value = "닉네임 중복 체크")
	@GetMapping("/check-nickname")
	public ResponseEntity<Boolean> getNickName(
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal,
		@RequestParam
		String nickname) {

		return ResponseEntity.ok(userService.existsByName(nickname, userPrincipal.getId()));
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "SignUpRequest", value = "회원가입 Request", required = true, dataType = "object", paramType = "body"),
		@ApiImplicitParam(name = "imageFile", value = "이지미 파일", required = false, dataType = "MultipartFile", paramType = "body")
	})
	@ApiOperation(value = "회원가입")
	@PostMapping("/signup")
	public ResponseEntity<UserDto> setSignUp(
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal,
		SignUpRequest signUpRequest,
		@RequestBody
		MultipartFile imageFile) {

		return ResponseEntity
			.status(HttpStatus.CREATED)
			.body(userService.setSignUp(userPrincipal.getId(), signUpRequest, imageFile));

	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "ProfileRequest", value = "프로필수정 Request", required = true, dataType = "object", paramType = "body"),
		@ApiImplicitParam(name = "imageFile", value = "이지미 파일", required = false, dataType = "MultipartFile", paramType = "body")
	})
	@ApiOperation(value = "프로필 수정")
	@PutMapping("/profile")
	public ResponseEntity<UserDto> setProfile(
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal,
		ProfileRequest profileRequest,
		@RequestBody
		MultipartFile imageFile) {

		return ResponseEntity.ok(userService.setProfile(userPrincipal.getId(), profileRequest, imageFile));

	}

	@ApiImplicitParam(name = "userId", value = "유저 ID", required = true, dataType = "long", paramType = "path")
	@ApiOperation(value = "유저 삭제")
	@DeleteMapping("/{userId}")
	public ResponseEntity<Boolean> deleteUser(
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal,
		@PathVariable
		Long userId) {

		//path의 userId와 oauth의 userId가 다르면 에러 발생
		if (!userPrincipal.getId().equals(userId)) {
			throw new UnauthChangeException();
		}

		return ResponseEntity.ok(userService.deleteUser(userPrincipal.getUser()));
	}
}
