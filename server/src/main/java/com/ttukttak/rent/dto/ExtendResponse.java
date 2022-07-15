package com.ttukttak.rent.dto;

import java.time.LocalDateTime;

import com.ttukttak.rent.entity.Extend;

import lombok.Builder;
import lombok.Data;

@Data
public class ExtendResponse {
	private Long id;
	private LocalDateTime extendDate;
	private Integer extendDays;

	public static ExtendResponse from(Extend extend) {
		return ExtendResponse.builder()
			.id(extend.getId())
			.extendDate(extend.getExtendDate())
			.extendDays(extend.getExtendDays())
			.build();
	}

	@Builder
	private ExtendResponse(Long id, LocalDateTime extendDate, Integer extendDays) {
		this.id = id;
		this.extendDate = extendDate;
		this.extendDays = extendDays;
	}
}
