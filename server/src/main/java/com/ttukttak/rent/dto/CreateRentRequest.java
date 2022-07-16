package com.ttukttak.rent.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateRentRequest {
	private Long bookId;
	private Long lenderId;
}
