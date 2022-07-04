package com.ttukttak.common.exception;

public class NotExistException extends RuntimeException {
	private static final String MESSAGE = "존재하지 않는 Entity입니다.";

	public NotExistException() {
		super(MESSAGE);
	}
}
