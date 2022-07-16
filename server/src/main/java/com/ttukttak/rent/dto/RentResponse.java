package com.ttukttak.rent.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.ttukttak.book.dto.BookDto;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.rent.entity.Rent;

import lombok.Builder;
import lombok.Data;

@Data
public class RentResponse {
	private Long id;
	private UserDto owner;
	private UserDto lender;
	private BookDto book;
	private LocalDate beginDate;
	private LocalDate endDate;
	private LocalDate returnDate;
	private List<ExtendResponse> extendList;
	private Rent.RentStatus status;

	public static RentResponse from(Rent rent) {

		return RentResponse.builder()
			.id(rent.getId())
			.owner(UserDto.from(rent.getOwner()))
			.lender(UserDto.from(rent.getLender()))
			.book(BookDto.from(rent.getBook()))
			.beginDate(rent.getBeginDate())
			.endDate(rent.getEndDate())
			.status(rent.getStatus())
			.returnDate(rent.getReturnDate())
			.extendList(rent.getExtendList().stream().map(ExtendResponse::from).collect(Collectors.toList()))
			.build();
	}

	@Builder
	public RentResponse(Long id, UserDto owner, UserDto lender, BookDto book, LocalDate beginDate,
		LocalDate endDate, LocalDate returnDate, List<ExtendResponse> extendList, Rent.RentStatus status) {
		this.id = id;
		this.owner = owner;
		this.lender = lender;
		this.book = book;
		this.beginDate = beginDate;
		this.endDate = endDate;
		this.returnDate = returnDate;
		this.extendList = extendList;
		this.status = status;
	}
}
