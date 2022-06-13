package com.ttukttak.chat.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

import com.ttukttak.chat.dto.MessageType;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class ChatMessage implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	private ChatRoom chatRoom;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@NotNull
	private String message;

	@Enumerated(EnumType.STRING)
	@ColumnDefault("'TEXT'")
	private MessageType messageType;

	private LocalDateTime sendedAt;

	@Builder
	public ChatMessage(Long id, ChatRoom chatRoom, User user, String message, MessageType messageType,
		LocalDateTime sendedAt) {
		this.id = id;
		this.chatRoom = chatRoom;
		this.user = user;
		this.message = message;
		this.messageType = messageType;
		this.sendedAt = sendedAt;
	}
}
