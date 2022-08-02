package com.ttukttak.oauth.service;

import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.oauth.dto.ProfileRequest;
import com.ttukttak.oauth.dto.SignUpRequest;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.User;

public interface UserService {

	UserDto getById(Long id);

	Boolean existsByName(String nickname, Long id);

	UserDto setSignUp(Long userId, SignUpRequest signUpRequest, MultipartFile imageFile);

	UserDto setProfile(Long id, ProfileRequest profileRequest, MultipartFile imageFile);

	Boolean deleteUser(User userId);

}
