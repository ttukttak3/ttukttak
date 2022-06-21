package com.ttukttak.chat.service;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.LastCheckedMessageRequest;

public interface ChatMessageService {
	ChatMessageDto saveChatMessage(ChatMessageDto chatMessageDto);

	ChatRoomInfo getChatMessages(Long roomId);

	void updateLastCheckedMessage(LastCheckedMessageRequest request);
}
