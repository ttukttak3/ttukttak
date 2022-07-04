package com.ttukttak.rent.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import com.ttukttak.book.entity.Book;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Rent extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User lender;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	private LocalDateTime beginDate;

	private LocalDateTime endDate;

	@ColumnDefault("false")
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
	public Rent(Long id, User lender, Book book, LocalDateTime beginDate, LocalDateTime endDate) {
		this.id = id;
		this.lender = lender;
		this.book = book;
		this.beginDate = beginDate;
		this.endDate = endDate;
	}
}
