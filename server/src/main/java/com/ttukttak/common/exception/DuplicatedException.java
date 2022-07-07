package com.ttukttak.common.exception;

public class DuplicatedException extends RuntimeException {
	private static final String MESSAGE = "이미 생성되어 있습니다.";

	public DuplicatedException() {
		super(MESSAGE);
	}
}
