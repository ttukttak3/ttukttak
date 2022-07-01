package com.ttukttak.book.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.ColumnDefault;

import com.ttukttak.address.entity.Town;
import com.ttukttak.book.dto.BookDto;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.rent.entity.Rent;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

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
	@JoinColumn(name = "owner_id")
	private User owner;

	@ManyToOne
	@JoinColumn(name = "book_info_id", nullable = true)
	private BookInfo bookInfo;

	@ManyToOne
	@JoinColumn(name = "book_category_id")
	private BookCategory bookCategory;

	@ManyToOne
	@JoinColumn(name = "town_id")
	private Town town;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book")
	private List<ChatRoom> chatRooms = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	@ColumnDefault("'N'")
	private DeleteStatus isDelete = DeleteStatus.N;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book", cascade = CascadeType.ALL)
	private List<BookImage> images = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book")
	private List<BookReview> bookReview = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book")
	private List<Rent> rent = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "thumbnail_id")
	private BookImage thumbnail;

	private String author;

	@Enumerated(EnumType.STRING)
	@ColumnDefault("'WAIT'")
	private BookStatus status = BookStatus.WAIT;

	public void addImage(BookImage image) {
		images.add(image);
		image.setBook(this);
	}

	public Book updateThumbnail(BookImage thumbnail) {
		this.thumbnail = thumbnail;
		return this;
	}

	@Builder
	public Book(Long id, String subject, String content, int deposit, User owner,
		BookInfo bookInfo, BookCategory bookCategory, BookImage thumbnail, String author, Town town) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.deposit = deposit;
		this.owner = owner;
		this.bookInfo = bookInfo;
		this.bookCategory = bookCategory;
		this.thumbnail = thumbnail;
		this.author = author;
		this.town = town;
	}

	public static Book of(BookDto BookDto) {
		return Book.builder()
			.id(BookDto.getId())
			.subject(BookDto.getSubject())
			.content(BookDto.getContent())
			.owner(User.of(BookDto.getOwner()))
			.bookInfo(BookDto.getBookInfo())
			.bookCategory(BookDto.getBookCategory())
			.thumbnail(BookDto.getThumbnail())
			.build();
	}

	public enum DeleteStatus {
		Y, N;

	}

	public enum BookStatus {
		// 대여가능, 예약중 ,대여중
		WAIT;
	}

}
