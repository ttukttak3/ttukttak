package com.ttukttak.oauth.dto;

import com.ttukttak.address.dto.HomeTownDto;
import com.ttukttak.address.entity.HomeTown.UseStatusType;
import com.ttukttak.oauth.entity.Role;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
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
	private HomeTownDto homeTown;

	@Builder
	private UserDto(Long id, String nickname, String email, String imageUrl, Role role, HomeTownDto homeTown) {
		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.imageUrl = imageUrl;
		this.role = role;
		this.homeTown = homeTown;
	}

	public static UserDto from(User user) {
		return UserDto.builder()
			.id(user.getId())
			.nickname(user.getNickname())
			.email(user.getEmail())
			.imageUrl(user.getImageUrl())
			.role(user.getRole())
			.homeTown(HomeTownDto.from(user.getHomeTown().stream()
				.filter(homeTown -> homeTown.getUseStatus().equals(UseStatusType.Y))
				.findFirst()
				.orElse(null)))
			.build();
	}

}
