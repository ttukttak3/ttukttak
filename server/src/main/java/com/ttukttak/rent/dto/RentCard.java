package com.ttukttak.rent.dto;

import java.time.LocalDate;

import com.ttukttak.rent.entity.Rent;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class RentCard {
	private LocalDate beginDate;
	private Boolean isReturn;
	private Rent.RentStatus status;
	private RentedBook rentedBook;

	@Builder
	private RentCard(LocalDate beginDate, Boolean isReturn, Rent.RentStatus status,
		RentedBook rentedBook) {
		this.beginDate = beginDate;
		this.isReturn = isReturn;
		this.status = status;
		this.rentedBook = rentedBook;
	}

	public static RentCard from(Rent rent) {

		return RentCard.builder()
			.beginDate(rent.getBeginDate())
			.isReturn(rent.getIsReturn())
			.status(rent.getStatus())
			.rentedBook(RentedBook.from(rent.getBook()))
			.build();
	}

}
