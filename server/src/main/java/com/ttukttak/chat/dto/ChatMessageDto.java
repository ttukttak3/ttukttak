package com.ttukttak.chat.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.oauth.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessageDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long userId;
	private Long roomId;
	private String message;
	private MessageType messageType;

	private LocalDateTime sendedAt;

	public ChatMessage toEntity() {
		ChatRoom chatRoom = ChatRoom.builder().id(roomId).build();
		User user = User.builder().id(userId).build();

		return ChatMessage.builder()
			.chatRoom(chatRoom)
			.user(user)
			.message(message)
			.messageType(messageType)
			.build();
	}
}
