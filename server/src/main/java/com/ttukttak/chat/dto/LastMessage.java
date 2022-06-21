package com.ttukttak.chat.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LastMessage implements Serializable {
	private static final long serialVersionUID = 1L;

	private String message;
	private MessageType messageType;
	private LocalDateTime sendedAt;
}
