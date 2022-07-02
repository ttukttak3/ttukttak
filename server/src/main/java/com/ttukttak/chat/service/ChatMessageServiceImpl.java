package com.ttukttak.chat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatUser;
import com.ttukttak.chat.dto.LastCheckedMessageRequest;
import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.entity.LastCheckedMessage;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.chat.repository.LastCheckedMessageRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatMessageServiceImpl implements ChatMessageService {
	private final ModelMapper modelMapper;
	private final ChatMessageRepository chatMessageRepository;
	private final LastCheckedMessageRepository lastCheckedMessageRepository;

	private final ChatRoomService chatRoomService;

	@Override
	public ChatMessageDto saveChatMessage(ChatMessageDto chatMessageDto) {
		chatMessageRepository.save(ChatMessage.of(chatMessageDto));
		return chatMessageDto;
	}

	@Override
	public ChatRoomInfo getChatMessages(Long roomId) {

		List<ChatMessageDto> messages = chatMessageRepository.findAllByChatRoomIdOrderBySendedAtAsc(roomId)
			.stream()
			.map(chatMessage -> modelMapper.map(chatMessage, ChatMessageDto.class))
			.collect(Collectors.toList());

		List<ChatUser> members = lastCheckedMessageRepository.findAllByRoomId(roomId)
			.stream()
			.map(lastCheckedMessage -> modelMapper.map(lastCheckedMessage.getUser(), ChatUser.class))
			.collect(
				Collectors.toList());

		chatRoomService.enterChatRoom(roomId);
		
		return ChatRoomInfo.builder().roomId(roomId).members(members).messages(messages).build();
	}

	@Override
	public void updateLastCheckedMessage(LastCheckedMessageRequest request) {
		LastCheckedMessage lastCheckedMessage = lastCheckedMessageRepository.findByRoomIdAndUserId(request.getRoomId(),
			request.getUserId());

		lastCheckedMessage.setChatMessage(ChatMessage.builder().id(request.getMessageId()).build());
	}
}
