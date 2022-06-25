package com.ttukttak.book.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.ttukttak.book.dto.BookDto;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Book extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String subject;

	@Column(columnDefinition = "TEXT")
	private String content;

	private int deposit;

	@ManyToOne
	@JoinColumn(name = "status_id")
	private BookStatus status;

	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;

	@ManyToOne
	@JoinColumn(name = "book_info_id")
	private BookInfo bookInfo;

	@ManyToOne
	@JoinColumn(name = "book_category_id")
	private BookCategory bookCategory;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book")
	private List<ChatRoom> chatRooms;

	//대여 Entity 추가 예정(대여 Entity의 진행상태로 대여가능 유무 판별 가능)

	@Builder
	public Book(Long id, String subject, String content, int deposit, BookStatus status, User owner, BookInfo bookInfo,
		BookCategory bookCategory) {

		this.id = id;
		this.subject = subject;
		this.content = content;
		this.deposit = deposit;
		this.status = status;
		this.owner = owner;
		this.bookInfo = bookInfo;
		this.bookCategory = bookCategory;
	}

	public static Book of(BookDto BookDto) {
		return Book.builder()
			.id(BookDto.getId())
			.subject(BookDto.getSubject())
			.content(BookDto.getContent())
			.status(BookDto.getStatus())
			.owner(User.of(BookDto.getOwner()))
			.bookInfo(BookDto.getBookInfo())
			.bookCategory(BookDto.getBookCategory())
			.build();
	}

}
