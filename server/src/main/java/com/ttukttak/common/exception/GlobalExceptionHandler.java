package com.ttukttak.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ttukttak.common.dto.StatusResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	private ResponseEntity<StatusResponse> createResponse(StatusCode statusCode) {
		return ResponseEntity
			.status(statusCode.getHttpStatus())
			.body(statusCode.toResponse());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<StatusResponse> handleException(Exception e) {
		log.info(e.getMessage());

		return createResponse(ExceptionFactory.getInstance(e));
	}
}
