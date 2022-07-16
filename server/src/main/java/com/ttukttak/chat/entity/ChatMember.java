package com.ttukttak.chat.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.ttukttak.book.entity.Book;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
@Entity
public class ChatMember implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "room_id")
	private ChatRoom room;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	@OneToOne
	@JoinColumn(name = "message_id")
	private ChatMessage lastCheckedMessage;

	public void changeRoom(ChatRoom room) {
		this.room = room;
	}

	@Builder
	public ChatMember(User user, ChatRoom room, Book book, ChatMessage lastCheckedMessage) {
		this.user = user;
		this.room = room;
		this.book = book;
		this.lastCheckedMessage = lastCheckedMessage;
	}

	public void setLastCheckedMessage(ChatMessage chatMessage) {
		this.lastCheckedMessage = chatMessage;
	}
}
