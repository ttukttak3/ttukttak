package com.ttukttak.rent.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ttukttak.book.entity.Book;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.common.exception.InvalidParameterException;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@ToString
public class Rent extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;

	@ManyToOne
	@JoinColumn(name = "lender_id")
	private User lender;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	private LocalDate beginDate;

	private LocalDate endDate;

	@Column(nullable = false, columnDefinition = "tinyint(1) default 0")
	private Boolean isReturn;

	public RentStatus getStatus() {
		//TODO: 상태값 구하는 로직

		return RentStatus.RETURN;
	}

	public enum RentStatus {
		//TODO: 대여일, 반납일로 현재 상태 구하는 로직

		// 대여중, 연체중, 반납완료
		RETURN;
	}

	public void returnBook() {
		isReturn = true;
	}

	@Builder
	public Rent(Long id, User owner, User lender, Book book, LocalDate beginDate, LocalDate endDate) {
		if (!checkValid(owner, lender)) {
			throw new InvalidParameterException();
		}

		this.id = id;
		this.owner = owner;
		this.lender = lender;
		this.book = book;
		this.beginDate = beginDate;
		this.endDate = endDate;
		this.isReturn = false;
	}

	private boolean checkValid(User owner, User lender) {
		return owner.getId() != lender.getId();
	}
}
