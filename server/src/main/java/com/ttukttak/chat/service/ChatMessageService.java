package com.ttukttak.chat.service;

import java.util.List;

import com.ttukttak.chat.dto.ChatMessageDto;

public interface ChatMessageService {
	void saveChatMessage(ChatMessageDto chatMessageDto);

	List<ChatMessageDto> getChatMessages(Long roomId);
}
