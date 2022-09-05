package com.ttukttak.chat.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ttukttak.book.dto.BookDto;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.rent.dto.RentResponse;
import com.ttukttak.rent.entity.Rent;

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

	private BookDto book;

	private RentResponse rent;

	private List<MemberResponse> members;

	private List<ChatMessageDto> messages = new ArrayList<>();

	@Builder
	public ChatRoomInfo(Long roomId, BookDto book, RentResponse rent,
		List<MemberResponse> members, List<ChatMessageDto> messages) {
		this.roomId = roomId;
		this.book = book;
		this.rent = rent;
		this.members = members;
		this.messages = messages;
	}

	public void updateRent(Rent rent) {
		this.rent = RentResponse.from(rent);
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
			.book(BookDto.from(chatRoom.getBook()))
			.messages(messages)
			.members(members)
			.build();
	}
}
