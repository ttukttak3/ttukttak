package com.ttukttak.chat.dto;

import java.io.Serializable;

import com.ttukttak.oauth.dto.UserDto;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class ChatRoomCard implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long roomId;
	private UserDto another;
	private LastMessage lastMessage;
	private int unread = 0;

	@Builder
	public ChatRoomCard(Long roomId, UserDto another, LastMessage lastMessage, int unread) {
		this.roomId = roomId;
		this.another = another;
		this.lastMessage = lastMessage;
		this.unread = unread;
	}
}
