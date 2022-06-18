package com.ttukttak.oauth.dto;

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

	public UserDto(User user) {
		this.id = user.getId();
		this.nickname = user.getNickname();
		this.email = user.getEmail();
		this.imageUrl = user.getImageUrl();
		this.role = user.getRole();
	}

	public User toEntity() {
		return User.builder()
			.id(id)
			.nickname(nickname)
			.imageUrl(imageUrl)
			.role(role)
			.build();
	}

}
