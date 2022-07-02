package com.ttukttak.chat.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ttukttak.chat.entity.LastCheckedMessage;
import com.ttukttak.chat.entity.QChatRoom;
import com.ttukttak.chat.entity.QLastCheckedMessage;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepositoryImpl implements ChatRoomRepositoryCustom {

	private final JPAQueryFactory query;

	public List<LastCheckedMessage> findAllChatRoomByUserId(Long userId) {
		QChatRoom chatRoom = new QChatRoom("cr");
		QLastCheckedMessage lcm = new QLastCheckedMessage("lcm");
		QLastCheckedMessage lcm2 = new QLastCheckedMessage("lcm2");

		return query.selectFrom(lcm)
			.where(lcm.room.in(
				JPAExpressions
					.selectFrom(chatRoom)
					.join(lcm2)
					.on(chatRoom.eq(lcm2.room))
					.where(lcm2.user.id.eq(userId))
			), lcm.user.id.ne(userId))
			.fetch();
	}

}
