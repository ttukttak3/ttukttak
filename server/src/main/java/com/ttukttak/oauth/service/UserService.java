package com.ttukttak.oauth.service;

import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.oauth.dto.SignUpRequest;
import com.ttukttak.oauth.dto.UserDto;

public interface UserService {

	UserDto getById(Long id);

	Boolean existsByName(String nickname, Long id);

	UserDto setSignUp(Long userId, SignUpRequest signUpRequest, MultipartFile imageFile);

}
