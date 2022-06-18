package com.ttukttak.chat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.repository.ChatMessageRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatMessageServiceImpl implements ChatMessageService {
	private final ModelMapper modelMapper;
	private final ChatMessageRepository chatMessageRepository;

	@Override
	public ChatMessageDto saveChatMessage(ChatMessageDto chatMessageDto) {
		chatMessageRepository.save(chatMessageDto.toEntity());
		return chatMessageDto;
	}

	@Override
	public List<ChatMessageDto> getChatMessages(Long roomId) {

		return chatMessageRepository.findAllByChatRoomId(roomId)
			.stream()
			.map(chatMessage -> modelMapper.map(chatMessage, ChatMessageDto.class))
			.collect(Collectors.toList());
	}
}
