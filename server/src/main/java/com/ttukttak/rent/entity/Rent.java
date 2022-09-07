package com.ttukttak.rent.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;

import com.ttukttak.book.entity.Book;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.common.BaseTimeEntity;
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
	private static final int DEFAULT_RENT_DAYS = 14;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "owner_id", nullable = true)
	private User owner;

	@ManyToOne
	@JoinColumn(name = "lender_id", nullable = true)
	private User lender;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	@ManyToOne
	@JoinColumn(name = "room_id")
	private ChatRoom room;

	@CreatedDate
	private LocalDate beginDate;

	private LocalDate returnDate;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "rent", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Extend> extendList = new ArrayList<>();

	public RentStatus getStatus() {
		if (returnDate != null) {
			return RentStatus.RETURN;
		}

		return RentStatus.RENTED;
	}

	public enum RentStatus {
		RENTED, RETURN;
	}

	public void returnBook() {
		returnDate = LocalDate.now();
	}

	@Builder
	public Rent(Long id, User lender, Book book, ChatRoom room, LocalDate beginDate) {
		User owner = book.getOwner();

		if (!checkValid(owner, lender)) {
			throw new IllegalArgumentException();
		}

		this.id = id;
		this.owner = owner;
		this.lender = lender;
		this.book = book;
		this.room = room;
		this.beginDate = beginDate;
	}

	public LocalDate getEndDate() {
		int extendDays = extendList.stream().map(Extend::getExtendDays).reduce(0, Integer::sum);

		return beginDate.plusDays(DEFAULT_RENT_DAYS + extendDays);
	}

	private boolean checkValid(User owner, User lender) {
		return owner.getId() != lender.getId();
	}
}
