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
		log.error(toLogMessage(e));

		return createResponse(ExceptionFactory.getInstance(e));
	}

	private String toLogMessage(Exception e) {
		String exceptionName = e.getClass().getName();
		String message = e.getMessage();

		String className = e.getStackTrace()[0].getClassName();
		int lineNumber = e.getStackTrace()[0].getLineNumber();

		return String.format("%s: %s - at %s: line %d", exceptionName, message, className, lineNumber);
	}
}
