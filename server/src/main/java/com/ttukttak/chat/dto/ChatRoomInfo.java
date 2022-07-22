package com.ttukttak.chat.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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
public class ChatRoomInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long roomId;

	private List<MemberResponse> members;

	private List<ChatMessageDto> messages = new ArrayList<>();

	@Builder
	public ChatRoomInfo(Long roomId, List<MemberResponse> members, List<ChatMessageDto> messages) {
		this.roomId = roomId;
		this.members = members;
		this.messages = messages;
	}
}
