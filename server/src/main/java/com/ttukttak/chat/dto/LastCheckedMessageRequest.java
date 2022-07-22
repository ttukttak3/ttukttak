package com.ttukttak.chat.dto;

import java.io.Serializable;

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
public class LastCheckedMessageRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	@NotNull
	@ApiModelProperty(example = "메시지 ID")
	private Long messageId;

	@NotNull
	@ApiModelProperty(example = "채팅방 ID")
	private Long roomId;
}
