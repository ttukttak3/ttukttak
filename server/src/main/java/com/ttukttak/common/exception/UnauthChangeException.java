package com.ttukttak.common.exception;

public class UnauthChangeException extends RuntimeException {
	private static final String MESSAGE = "권한이 없습니다.";

	public UnauthChangeException() {
		super(MESSAGE);
	}
}
