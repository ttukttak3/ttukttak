package com.ttukttak.oauth.dto;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.address.entity.HomeTown;
import com.ttukttak.address.entity.HomeTown.UseStatusType;
import com.ttukttak.address.entity.Town;
import com.ttukttak.oauth.entity.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserResponse {
	private Long id;
	private String nickname;
	private String email;
	private String imageUrl;
	private String address;

	public UserResponse(User user) {
		this.id = user.getId();
		this.nickname = user.getNickname();
		this.email = user.getEmail();
		this.imageUrl = user.getImageUrl();
		this.address = new TownDto(
			user.getHomeTown()
				.stream()
				.filter(homeTown -> homeTown.getUseStatus().equals(UseStatusType.Y))
				.findFirst()
				.orElse(
					new HomeTown(null, user,
						new Town((long)1111011900, "서울특별시", "종로구", "세종로", "", 37.58028530, 126.97675720),
						UseStatusType.Y))
				.getTown())
					.getAddress();
	}
}
