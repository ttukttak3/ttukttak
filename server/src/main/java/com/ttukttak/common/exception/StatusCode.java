package com.ttukttak.common.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusCode {
	SUCCESS(HttpStatus.OK, "A-1", "Success"),
	INVALID_PARAMETER(HttpStatus.PAYMENT_REQUIRED, "C-1", "Invalid input values"),
	MISSING_PARAMETER(HttpStatus.BAD_REQUEST, "C-2", "Missing parameters"),
	NO_SUCH_ELEMENT(HttpStatus.BAD_REQUEST, "C-3", "Not exist element"),
	UNAUTHORIZED_USER(HttpStatus.BAD_REQUEST, "C-4", "Not authorized"),
	INVALID_METHOD(HttpStatus.BAD_REQUEST, "C-5", "Invalid method"),
	SERVER_RESOURCE(HttpStatus.INTERNAL_SERVER_ERROR, "S-1", "Reseource error"),
	SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S-2", "Server error");

	private final HttpStatus httpStatus;
	private final String code;
	private final String message;

}