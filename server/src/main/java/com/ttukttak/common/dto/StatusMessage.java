package com.ttukttak.common.dto;


import com.ttukttak.common.exception.StatusCode;

import lombok.Getter;

@Getter
public class StatusMessage {
	private String message;
	private String code;

	public StatusMessage(StatusCode statusCode) {
		this.message = statusCode.getMessage();
		this.code = statusCode.getCode();
	}
}
