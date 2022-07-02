package com.ttukttak.oauth.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ttukttak.address.dto.HomeTownDto;
import com.ttukttak.oauth.entity.Role;
import com.ttukttak.oauth.entity.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
	private Long id;
	private String nickname;
	private String email;
	private String imageUrl;
	private Role role;
	private List<HomeTownDto> homeTown;

	public UserDto(User user) {
		this.id = user.getId();
		this.nickname = user.getNickname();
		this.email = user.getEmail();
		this.imageUrl = user.getImageUrl();
		this.role = user.getRole();
		this.homeTown = user.getHomeTown()
			.stream()
			.map(c -> new HomeTownDto(c))
			.collect(Collectors.toList());
	}

}
