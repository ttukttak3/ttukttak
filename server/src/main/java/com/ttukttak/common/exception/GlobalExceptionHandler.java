package com.ttukttak.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ttukttak.common.dto.StatusMessage;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private ResponseEntity<StatusMessage> createResponse(StatusCode statusCode) {
		return ResponseEntity
				.status(statusCode.getHttpStatus())
				.body(new StatusMessage(statusCode));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<StatusMessage> handleException(Exception e) {
		e.printStackTrace();

		return createResponse(ExceptionFactory.getInstance(e));
	}
}
