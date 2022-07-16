package com.ttukttak.chat.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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

	@NotNull
	@ApiModelProperty(example = "보낸사람 ID")
	private Long userId;

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

}
