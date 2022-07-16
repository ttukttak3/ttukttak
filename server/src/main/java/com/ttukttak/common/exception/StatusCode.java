package com.ttukttak.common.exception;

import org.springframework.http.HttpStatus;

import com.ttukttak.common.dto.StatusResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusCode {
	INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "C-IP", "Invalid input values"),
	MISSING_PARAMETER(HttpStatus.BAD_REQUEST, "C-MP", "Missing parameters"),
	INVALID_METHOD(HttpStatus.BAD_REQUEST, "C-IM", "Invalid method"),
	NOT_EXIST_OAUTH_ACCOUNT(HttpStatus.NOT_FOUND, "C-NEOA", "Not exist auth account"),
	DUPLICATED_ELEMENT(HttpStatus.BAD_REQUEST, "C-DE", "Already exist"),
	ILLEGAL_ARGUMENT(HttpStatus.BAD_REQUEST, "C-NEE", "Illegal argument"),
	UNAUTH(HttpStatus.UNAUTHORIZED, "C-U", "Unauthorized request"),
	SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S-1", "Server error");

	private final HttpStatus httpStatus;
	private final String code;
	private final String message;

	public StatusResponse toResponse() {
		return new StatusResponse(this);
	}
}
