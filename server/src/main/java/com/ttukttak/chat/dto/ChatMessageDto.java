package com.ttukttak.chat.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.ttukttak.chat.entity.ChatMessage;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ChatMessageDto implements Serializable {
	private static final long serialVersionUID = 1L;

	@ApiModelProperty
	private Long id;

	@NotNull
	@ApiModelProperty(example = "보낸 멤버 ID")
	private Long memberId;

	@NotNull
	@ApiModelProperty(example = "채팅방 ID")
	private Long roomId;

	@NotEmpty
	@ApiModelProperty(example = "메시지 내용")
	private String message;

	@NotNull
	@ApiModelProperty(example = "TEXT or FILE")
	private MessageType messageType;

	@ApiModelProperty
	private LocalDateTime sendedAt;

	@Builder
	private ChatMessageDto(Long id, Long memberId, Long roomId, String message,
		MessageType messageType, LocalDateTime sendedAt) {
		this.id = id;
		this.memberId = memberId;
		this.roomId = roomId;
		this.message = message;
		this.messageType = messageType;
		this.sendedAt = sendedAt;
	}

	public static ChatMessageDto from(ChatMessage chatMessage) {
		return ChatMessageDto.builder()
			.id(chatMessage.getId())
			.memberId(chatMessage.getMember().getId())
			.roomId(chatMessage.getChatRoom().getId())
			.message(chatMessage.getMessage())
			.messageType(chatMessage.getMessageType())
			.sendedAt(chatMessage.getSendedAt())
			.build();
	}

}
