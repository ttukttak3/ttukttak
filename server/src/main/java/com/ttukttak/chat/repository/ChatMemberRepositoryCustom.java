package com.ttukttak.chat.repository;

import java.util.List;

import com.ttukttak.chat.entity.ChatMember;

public interface ChatMemberRepositoryCustom {
	List<ChatMember> findAllChatMemberByUserId(Long userId);
}
