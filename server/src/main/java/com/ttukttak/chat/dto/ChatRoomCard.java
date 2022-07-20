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
	private MemberResponse another;
	private LastMessage lastMessage;
	private int unread = 0;

	@Builder
	public ChatRoomCard(Long roomId, MemberResponse another, LastMessage lastMessage, int unread) {
		this.roomId = roomId;
		this.another = another;
		this.lastMessage = lastMessage;
		this.unread = unread;
	}
}
