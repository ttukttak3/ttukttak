package com.ttukttak.address.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CoordinateRequest {

	@ApiModelProperty(example = "위도")
	private Double latitude;

	@ApiModelProperty(example = "경도")
	private Double longitude;
}
