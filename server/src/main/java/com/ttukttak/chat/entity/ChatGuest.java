package com.ttukttak.chat.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ttukttak.book.entity.Book;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class ChatGuest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	@ManyToOne
	@JoinColumn(name = "room_id")
	private ChatRoom room;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Builder
	public ChatGuest(Book book, ChatRoom room, User user) {
		this.book = book;
		this.room = room;
		this.user = user;
	}
}
