package com.ttukttak.oauth.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.address.entity.Town;
import com.ttukttak.address.service.AddressService;
import com.ttukttak.address.service.HomeTownService;
import com.ttukttak.common.StorageUploader;
import com.ttukttak.common.dto.FileUploadResponse;
import com.ttukttak.oauth.dto.SignUpRequest;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.Role;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final AddressService addressService;
	private final HomeTownService homeTownService;
	private final StorageUploader storageUploader;

	@Override
	public UserDto getById(Long id) {
		User user = userRepository.findById(id).orElse(null);

		return new UserDto(user);
	}

	@Override
	public Boolean existsByName(String nickname, Long id) {
		return userRepository.existsByNicknameAndIdNot(nickname, id);
	}

	@Override
	@Transactional
	public UserDto setSignUp(Long userId, SignUpRequest signUpRequest, MultipartFile imageFile) {
		UserDto userDto = new UserDto();
		User user = userRepository.findById(userId).orElse(null);
		try {
			/*
			 * 파일 업로드 (파일이 없는 경우 업로드 X)
			 * 업로드시에는 기존파일 삭제
			 */
			System.out.println(imageFile);
			if (imageFile != null) {
				String currentImg = user.getImageUrl();
				FileUploadResponse fileUploadResponse = storageUploader.upload(imageFile, "profile");
				user.update(signUpRequest.getNickname(), fileUploadResponse.getUrl(), Role.USER);
				storageUploader.removeOldFile(currentImg);
			} else {
				user.update(signUpRequest.getNickname(), user.getImageUrl(), Role.USER);
			}
			userRepository.save(user);

			/*
			 * home_town에 데이터 추가.
			 * townId가 없을 경우 기본값인 1111011900 (서울시 종로구 세종로)
			 */
			Town town = new Town();
			if (signUpRequest.getTownId() != null) {
				town = Town.of(addressService.getById(signUpRequest.getTownId()));
			} else {
				town = Town.of(addressService.getById(Long.parseLong("1111011900")));
			}

			homeTownService.save(user, town);

			userDto = new UserDto(userRepository.findById(user.getId()).orElse(null));

		} catch (IOException e) {
			return userDto;
		}
		return userDto;
	}

}
