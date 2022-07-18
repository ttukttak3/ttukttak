package com.ttukttak.oauth.dto;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProfileRequest {

	@ApiModelProperty(example = "닉네임")
	@NotNull
	private String nickname;

	@ApiModelProperty(example = "소개글")
	private String introduction;

	@ApiModelProperty(example = "지역 ID")
	@NotNull
	private Long townId;
}
