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
	public void saveChatMessage(ChatMessageDto chatMessageDto) {
		chatMessageRepository.save(chatMessageDto.toEntity());
	}

	@Override
	public List<ChatMessageDto> getChatMessages(Long roomId) {

		return chatMessageRepository.findAllByRoomId(roomId)
			.stream()
			.map(chatMessage -> modelMapper.map(chatMessage, ChatMessageDto.class))
			.collect(Collectors.toList());
	}
}
