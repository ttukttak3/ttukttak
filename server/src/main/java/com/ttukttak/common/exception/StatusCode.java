package com.ttukttak.common.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusCode {
	INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "C-1", "Invalid input values"),
	MISSING_PARAMETER(HttpStatus.BAD_REQUEST, "C-2", "Missing parameters"),
	INVALID_METHOD(HttpStatus.BAD_REQUEST, "C-3", "Invalid method"),
	UNAUTHORIZED_USER(HttpStatus.UNAUTHORIZED, "C-4", "Not authorized"),
	NOT_EXIST_OAUTH_ACCOUNT(HttpStatus.NOT_FOUND, "C-5", "Not exist auth account"),
	DUPLICATED_ELEMENT(HttpStatus.BAD_REQUEST, "C-6", "Already exist"),
	NOT_EXIST_ENTITY(HttpStatus.BAD_REQUEST, "C-7", "Not exist entity"),
	SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S-1", "Server error");

	private final HttpStatus httpStatus;
	private final String code;
	private final String message;

}
