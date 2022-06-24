package com.ttukttak.oauth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.oauth.dto.SignUpRequest;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.UserPrincipal;
import com.ttukttak.oauth.service.UserService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	@ApiOperation(value = "로그인한 유저정보 조회")
	@GetMapping("/me")
	public ResponseEntity<UserDto> getCurrentUser(@CurrentUser
	UserPrincipal userPrincipal) {

		UserDto userDto = userService.getById(userPrincipal.getId());

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(userDto);
	}

	@ApiImplicitParam(name = "nickname", value = "닉네임", required = true, dataType = "String", paramType = "Param")
	@ApiOperation(value = "닉네임 중복 체크")
	@GetMapping("/chknickname")
	public ResponseEntity<Boolean> chkName(@CurrentUser
	UserPrincipal userPrincipal, @RequestParam
	String nickname) {
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(userService.existsByName(nickname, userPrincipal.getId()));
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "SignUpRequest", value = "회원가입 Request", required = true, dataType = "object", paramType = "body"),
		@ApiImplicitParam(name = "imageFile", value = "이지미 파일", required = false, dataType = "MultipartFile", paramType = "body")
	})
	@ApiOperation(value = "회원가입")
	@PostMapping("/signup")
	public ResponseEntity<UserDto> setSignUp(@CurrentUser
	UserPrincipal userPrincipal, SignUpRequest signUpRequest, @RequestBody
	MultipartFile imageFile) {

		UserDto userDto = userService.setSignUp(userPrincipal.getUser(), signUpRequest, imageFile);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(userDto);

	}
}
