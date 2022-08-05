package com.ttukttak.oauth.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.address.entity.Town;
import com.ttukttak.address.service.AddressService;
import com.ttukttak.address.service.HomeTownService;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.book.repository.BookReviewRepository;
import com.ttukttak.chat.repository.ChatMemberRepository;
import com.ttukttak.common.StorageUploader;
import com.ttukttak.common.dto.FileUploadResponse;
import com.ttukttak.common.exception.ResourceNotFoundException;
import com.ttukttak.oauth.dto.ProfileRequest;
import com.ttukttak.oauth.dto.SignUpRequest;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.Role;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;
import com.ttukttak.rent.entity.Rent;
import com.ttukttak.rent.repository.RentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final AddressService addressService;
	private final HomeTownService homeTownService;
	private final StorageUploader storageUploader;

	private final RentRepository rentRepository;
	private final BookRepository bookRepository;
	private final BookReviewRepository bookReviewRepository;
	private final ChatMemberRepository chatMemberRepository;

	@Override
	public UserDto getById(Long id) {
		User user = userRepository.findById(id).orElseThrow(
			() -> new IllegalArgumentException());

		return UserDto.from(user);
	}

	@Override
	public Boolean existsByName(String nickname, Long id) {
		return userRepository.existsByNicknameAndIdNot(nickname, id);
	}

	@Override
	@Transactional
	public UserDto setSignUp(Long userId, SignUpRequest signUpRequest, MultipartFile imageFile) {
		UserDto userDto = new UserDto();
		User user = userRepository.findById(userId).orElseThrow(
			() -> new IllegalArgumentException());
		try {
			/*
			 * 파일 업로드 (파일이 없는 경우 업로드 X)
			 * 업로드시에는 기존파일 삭제
			 */
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
				town = Town.from(addressService.getById(signUpRequest.getTownId()));
			} else {
				town = Town.from(addressService.getById(Long.parseLong("1111011900")));
			}

			homeTownService.save(user, town);

			userDto = UserDto.from(userRepository.findById(user.getId()).orElseThrow(
				() -> new IllegalArgumentException()));

		} catch (IOException e) {
			return userDto;
		}
		return userDto;
	}

	@Override
	@Transactional
	public UserDto setProfile(Long userId, ProfileRequest profileRequest, MultipartFile imageFile) {
		UserDto userDto = new UserDto();
		User user = userRepository.findById(userId).orElseThrow(
			() -> new IllegalArgumentException());
		try {
			/*
			 * 파일 업로드 (파일이 없는 경우 업로드 X)
			 * 업로드시에는 기존파일 삭제
			 */
			if (imageFile != null) {
				String currentImg = user.getImageUrl();
				FileUploadResponse fileUploadResponse = storageUploader.upload(imageFile, "profile");
				user.update(profileRequest.getNickname(), fileUploadResponse.getUrl(),
					profileRequest.getIntroduction());
				storageUploader.removeOldFile(currentImg);
			} else {
				user.update(profileRequest.getNickname(), user.getImageUrl(), profileRequest.getIntroduction());
			}
			userRepository.save(user);

			/*
			 * hometown DB update
			 */
			Town town = Town.from(addressService.getById(profileRequest.getTownId()));
			homeTownService.save(user, town);

			userDto = UserDto.from(userRepository.findById(user.getId()).orElseThrow(
				() -> new ResourceNotFoundException("User", "id", user.getId())));

		} catch (IOException e) {
			return userDto;
		}
		return userDto;
	}

	@Override
	@Transactional
	public Boolean deleteUser(User user) {
		Long userId = user.getId();
		/*
		 * 대여가 진행중이면 삭제 불가
		 * return_date == null << 대여중
		 */
		List<Rent> rent = rentRepository.findAllByLenderIdAndReturnDateIsNull(userId).orElse(new ArrayList<>());

		//rent 데이터가 조회되면 false 리턴
		if (rent.size() > 0) {
			return false;
		}

		/*
		 * 유저 삭제시 연관 테이블
		 * HomeTown => cascade
		 * Book => isDelete true 및 owner_id set null
		 * Review => reviewer_id set null (리뷰 작성 내역을 남긴다)
		 * Rent => owner_id , lender_id set null (대여 내역을 남긴다)
		 * ChatMember => user_id set null (채팅 맴버 내역을 남긴다)
		 * Book, Review, Rent, ChatMember, HomeTown
		 */

		//book 조회
		List<Book> bookList = bookRepository.findAllByOwnerId(userId).orElse(new ArrayList<>());

		bookList.stream()
			.forEach(
				book -> {
					book.removeBook();
					bookRepository.save(book);
				});

		//book, review, rent, ChatMember set NULL
		bookRepository.setNullOwner(user);
		bookReviewRepository.setNullReviewer(user);
		rentRepository.setNullLender(user);
		rentRepository.setNullOwner(user);
		chatMemberRepository.setNullUser(user);

		userRepository.delete(user);

		return true;
	}

}
