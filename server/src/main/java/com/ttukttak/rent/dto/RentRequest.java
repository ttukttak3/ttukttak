package com.ttukttak.rent.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RentRequest {
	private Long ownerId;
	private Long lenderId;
	private Long bookId;
	private LocalDate beginDate;
}
