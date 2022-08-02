package com.ttukttak.chat.entity;

import java.io.Serializable;
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
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ttukttak.book.entity.Book;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.rent.entity.Rent;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoom extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "room")
	private Rent rent = null;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "chatRoom", cascade = CascadeType.ALL)
	private List<ChatMessage> messages = new ArrayList<>();

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ChatMember> chatMembers = new ArrayList<>();

	public void addChatMember(ChatMember chatMember) {
		chatMembers.add(chatMember);
		chatMember.changeRoom(this);
	}

	public void addMessage(ChatMessage message) {
		messages.add(message);
		message.changeChatRoom(this);
	}

	@Builder
	public ChatRoom(Long id, Book book) {
		this.id = id;
		this.book = book;
	}
}
