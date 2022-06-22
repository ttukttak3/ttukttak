package com.ttukttak.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ttukttak.common.dto.StatusMessage;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	private ResponseEntity<StatusMessage> createResponse(StatusCode statusCode) {
		return ResponseEntity
			.status(statusCode.getHttpStatus())
			.body(new StatusMessage(statusCode));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<StatusMessage> handleException(Exception e) {
		log.info(e.getMessage());

		return createResponse(ExceptionFactory.getInstance(e));
	}
}
