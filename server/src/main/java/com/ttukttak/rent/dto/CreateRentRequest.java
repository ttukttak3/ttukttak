package com.ttukttak.rent.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateRentRequest {
	@NotNull
	private Long bookId;
	@NotNull
	private Long lenderId;
}
