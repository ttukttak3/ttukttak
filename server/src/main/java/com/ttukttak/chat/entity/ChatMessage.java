package com.ttukttak.chat.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
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
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.MessageType;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Entity
@ToString
@EntityListeners(AuditingEntityListener.class)
public class ChatMessage implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	private ChatRoom chatRoom;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private ChatMember member;

	@NotNull
	private String message;

	@Enumerated(EnumType.STRING)
	@ColumnDefault("'TEXT'")
	private MessageType messageType;

	@CreatedDate
	private LocalDateTime sendedAt;

	@Builder
	public ChatMessage(Long id, ChatRoom chatRoom, ChatMember member, String message, MessageType messageType) {
		this.id = id;
		this.chatRoom = chatRoom;
		this.member = member;
		this.message = message;
		this.messageType = messageType;
	}

	public void changeChatRoom(ChatRoom chatRoom) {
		this.chatRoom = chatRoom;
	}

	public static ChatMessage from(ChatMessageDto chatMessageDto) {
		ChatRoom chatRoom = ChatRoom.builder().id(chatMessageDto.getRoomId()).build();
		ChatMember member = ChatMember.builder().id(chatMessageDto.getMemberId()).build();

		return ChatMessage.builder()
			.chatRoom(chatRoom)
			.member(member)
			.message(chatMessageDto.getMessage())
			.messageType(chatMessageDto.getMessageType())
			.build();
	}
}
