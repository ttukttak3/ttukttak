package com.ttukttak.chat.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class LastCheckedMessage implements Serializable {
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

	@OneToOne
	@JoinColumn(name = "message_id")
	private ChatMessage chatMessage;

	public void changeRoom(ChatRoom room) {
		this.room = room;
	}

	@Builder
	public LastCheckedMessage(User user, ChatRoom room, ChatMessage chatMessage) {
		this.user = user;
		this.room = room;
		this.chatMessage = chatMessage;
	}
}
