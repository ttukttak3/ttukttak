package com.ttukttak.common.exception;

import java.util.Arrays;

import javax.security.auth.message.AuthException;

import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;

public enum ExceptionFactory {
	METHOD_ARGUMNET_NOT_VALID(MethodArgumentNotValidException.class, StatusCode.INVALID_PARAMETER),
	MISSING_REQUEST_PARAMETER(MissingServletRequestParameterException.class, StatusCode.MISSING_PARAMETER),
	HTTP_METHOD_NOT_SUPPORTED(HttpRequestMethodNotSupportedException.class, StatusCode.INVALID_METHOD),
	// NOT_EXIST_ELEMENT(NotExistException.class, StatusCode.NO_SUCH_ELEMENT),
	NOT_AUTHORIZED(AuthException.class, StatusCode.UNAUTHORIZED_USER),
	// RESOURCE_EXCEPTION(ResourceException.class, StatusCode.SERVER_RESOURCE),
	SERVER_EXCEPTION(Exception.class, StatusCode.SERVER_ERROR);

	private final Class<? extends Exception> clazz;
	private final StatusCode statusCode;

	ExceptionFactory(Class<? extends Exception> clazz, StatusCode statusCode) {
		this.clazz = clazz;
		this.statusCode = statusCode;
	}

	public static StatusCode getInstance(Exception e) {
		return Arrays.stream(ExceptionFactory.values())
			.filter(v -> v.clazz == e.getClass())
			.findFirst()
			.orElse(SERVER_EXCEPTION).statusCode;
	}

}