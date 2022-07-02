package com.ttukttak.chat.repository;

import java.util.List;

import com.ttukttak.chat.entity.LastCheckedMessage;

public interface ChatRoomRepositoryCustom {
	List<LastCheckedMessage> findAllChatRoomByUserId(Long userId);
}
