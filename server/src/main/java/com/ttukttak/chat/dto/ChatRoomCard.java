package com.ttukttak.chat.dto;

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
public class ChatRoomCard {
	private Long roomId;
	private Long bookId;
	private ChatUser other;
	private LastMessage lastMessage;

}
