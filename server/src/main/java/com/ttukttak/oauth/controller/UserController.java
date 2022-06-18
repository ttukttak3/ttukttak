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

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	/*
	 * 로그인한 유저정보 가져오기
	 */
	@GetMapping("/me")
	public ResponseEntity<UserDto> getCurrentUser(@CurrentUser
	UserPrincipal userPrincipal) {

		UserDto userDto = userService.getById(userPrincipal.getId());

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(userDto);
	}

	/*
	 * 닉네임 중복 체크
	 */
	@GetMapping("/chknickname")
	public ResponseEntity<Boolean> chkName(@RequestParam
	String nickname) {
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(userService.existsByName(nickname));
	}

	/*
	 * 회원가입
	 */
	@PostMapping("/signup")
	public ResponseEntity<Boolean> setSignUp(@CurrentUser
	UserPrincipal userPrincipal, SignUpRequest signUpRequest, @RequestBody
	MultipartFile imageFile) {

		signUpRequest.setUserId(userPrincipal.getId());

		Boolean queryChk = userService.setSignUp(signUpRequest, imageFile);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(queryChk);

	}
}
