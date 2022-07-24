package com.ttukttak.chat.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ttukttak.chat.entity.ChatRoom;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
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

	public static ChatRoomInfo from(ChatRoom chatRoom) {
		List<MemberResponse> members = chatRoom.getChatMembers()
			.stream()
			.map(MemberResponse::from)
			.collect(
				Collectors.toList());

		List<ChatMessageDto> messages = chatRoom.getMessages()
			.stream()
			.map(ChatMessageDto::from)
			.collect(
				Collectors.toList());

		return ChatRoomInfo.builder()
			.roomId(chatRoom.getId())
			.messages(messages)
			.members(members)
			.build();
	}
}
