package com.ttukttak.oauth.dto;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequest {

	@ApiModelProperty(example = "닉네임")
	@NotNull
	private String nickname;

	@ApiModelProperty(example = "지역 ID")
	private Long townId;
	/*
	 * request 받을때 해당값이 없을 경우 bind 에러 발생으로 제외
	 * 없을 경우 : 해당 유저가 프로필 변경없이 회원가입을 할 경우.
	 */
	//private MultipartFile imageFile
}
