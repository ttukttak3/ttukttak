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

import net.minidev.json.annotate.JsonIgnore;

import com.ttukttak.book.entity.Book;
import com.ttukttak.common.BaseTimeEntity;

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
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "chatRoom")
	private List<ChatMessage> messages = new ArrayList<>();

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<LastCheckedMessage> lastCheckedMessages = new ArrayList<>();

	public void addLastCheckedMessage(LastCheckedMessage lastCheckedMessage) {
		lastCheckedMessages.add(lastCheckedMessage);
		lastCheckedMessage.changeRoom(this);
	}

	@Builder
	public ChatRoom(Long id, Book book, List<ChatMessage> messages,
		List<LastCheckedMessage> lastCheckedMessages) {
		this.id = id;
		this.book = book;
		this.messages = messages;
		this.lastCheckedMessages = lastCheckedMessages;
	}
}
