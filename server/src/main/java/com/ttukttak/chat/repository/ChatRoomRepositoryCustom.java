package com.ttukttak.chat.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.entity.QChatRoom;
import com.ttukttak.chat.entity.QLastCheckedMessage;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepositoryCustom {

	private final JPAQueryFactory query;

	public List<ChatRoom> findAllChatRoomByUserId(Long userId) {
		QChatRoom cr = new QChatRoom("cr");
		QLastCheckedMessage lcm = new QLastCheckedMessage("lcm");

		return query.selectFrom(cr)
			.where(lcm.user.id.eq(userId), lcm.room.id.eq(cr.id))
			.fetch();
	}

}
