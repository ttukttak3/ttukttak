package com.ttukttak.oauth.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import com.ttukttak.address.entity.HomeTown;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.oauth.dto.UserDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String nickname;

	@Column(nullable = false)
	private String email;

	@Column
	private String imageUrl;

	@NotNull
	@JsonIgnore
	@Enumerated(EnumType.STRING)
	private AuthProvider provider;

	@Column
	@Enumerated(EnumType.STRING)
	private Role role;

	@Column
	private String providerId;

	@Column
	private String gender;

	@Column
	private String age;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<HomeTown> homeTown = new ArrayList<>();

	@Builder
	public User(Long id, String nickname, String email, String imageUrl, Role role, AuthProvider provider,
		String providerId, String gender, String age) {
		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.imageUrl = imageUrl;
		this.role = role;
		this.provider = provider;
		this.providerId = providerId;
		this.gender = gender;
		this.age = age;
	}

	public User update(String nickname, String imageUrl, Role role) {
		this.nickname = nickname;
		this.imageUrl = imageUrl;
		this.role = role;
		return this;
	}

	public static User of(UserDto userDto) {

		return User.builder()
			.id(userDto.getId())
			.nickname(userDto.getNickname())
			.imageUrl(userDto.getImageUrl())
			.role(userDto.getRole())
			.build();
	}

}
