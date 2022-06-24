package com.ttukttak.oauth.service;

import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.oauth.dto.SignUpRequest;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.User;

public interface UserService {

	UserDto getById(Long id);

	Boolean existsByName(String nickname, Long id);

	Boolean setSignUp(User user, SignUpRequest signUpRequest, MultipartFile imageFile);

}
