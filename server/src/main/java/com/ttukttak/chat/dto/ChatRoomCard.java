package com.ttukttak.chat.dto;

import java.io.Serializable;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class ChatRoomCard implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long roomId;
	private ChatUser other;
	private LastMessage lastMessage;
	private int unread = 0;

	@Builder
	public ChatRoomCard(Long roomId, ChatUser other, LastMessage lastMessage, int unread) {
		this.roomId = roomId;
		this.other = other;
		this.lastMessage = lastMessage;
		this.unread = unread;
	}
}
