package com.ttukttak.chat.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.oauth.entity.User;

import io.swagger.annotations.ApiModelProperty;
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

	@ApiModelProperty
	private Long id;

	@ApiModelProperty(example = "보낸사람 ID")
	private Long userId;

	@ApiModelProperty(example = "채팅방 ID")
	private Long roomId;

	@ApiModelProperty(example = "메시지 내용")
	private String message;

	@ApiModelProperty(example = "TEXT or FILE")
	private MessageType messageType;

	@ApiModelProperty
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
