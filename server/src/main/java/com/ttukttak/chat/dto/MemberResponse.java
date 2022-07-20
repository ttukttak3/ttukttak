package com.ttukttak.chat.dto;

import java.io.Serializable;

import com.ttukttak.chat.entity.ChatMember;
import com.ttukttak.oauth.dto.UserDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MemberResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long memberId;
	private Long roomId;
	private Long bookId;
	private UserDto user;

	@Builder
	private MemberResponse(Long memberId, Long roomId, Long bookId, UserDto user) {
		this.memberId = memberId;
		this.roomId = roomId;
		this.bookId = bookId;
		this.user = user;
	}

	public static MemberResponse from(ChatMember chatMember) {
		return MemberResponse.builder()
			.memberId(chatMember.getId())
			.roomId(chatMember.getRoom().getId())
			.bookId(chatMember.getBook().getId())
			.user(UserDto.from(chatMember.getUser()))
			.build();
	}
}
