package com.ttukttak.chat.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ttukttak.chat.entity.ChatMember;
import com.ttukttak.chat.entity.QChatMember;
import com.ttukttak.chat.entity.QChatRoom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatMemberRepositoryImpl implements ChatMemberRepositoryCustom {

	private final JPAQueryFactory query;

	public List<ChatMember> findAllChatMemberByUserId(Long userId) {
		QChatRoom cr = new QChatRoom("cr");
		QChatMember cm = new QChatMember("cm");
		QChatMember cm2 = new QChatMember("cm");

		return query.selectFrom(cm)
			.where(cm.room.in(
				JPAExpressions
					.selectFrom(cr)
					.join(cm2)
					.on(cr.eq(cm2.room))
					.where(cm2.user.id.eq(userId))
			), cm.user.id.ne(userId))
			.fetch();
	}

}
