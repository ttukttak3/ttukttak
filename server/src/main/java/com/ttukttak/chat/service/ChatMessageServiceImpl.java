package com.ttukttak.chat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatUser;
import com.ttukttak.chat.dto.LastCheckedMessageRequest;
import com.ttukttak.chat.entity.ChatMember;
import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.repository.ChatMemberRepository;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.common.exception.UnauthChangeException;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatMessageServiceImpl implements ChatMessageService {
	private final ModelMapper modelMapper;
	private final ChatMessageRepository chatMessageRepository;
	private final ChatMemberRepository chatMemberRepository;
	private final UserRepository userRepository;

	private final ChatRoomService chatRoomService;

	@Override
	public ChatMessageDto saveChatMessage(ChatMessageDto chatMessageDto) {
		chatMessageRepository.save(ChatMessage.from(chatMessageDto));
		return chatMessageDto;
	}

	@Override
	@Transactional
	public ChatRoomInfo getChatMessages(Long roomId, Long userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException());

		List<ChatMember> chatMembers = chatMemberRepository.findAllByRoomId(roomId);

		ChatMember findChatMember = chatMembers.stream()
			.filter(lcm -> lcm.getUser().getId() == user.getId())
			.findFirst()
			.orElseThrow(() -> new IllegalArgumentException());

		List<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoomIdOrderBySendedAtAsc(roomId);

		// 마지막 읽은 메시지 갱신
		if (chatMessages.size() > 0) {
			ChatMessage lastChatMessage = chatMessages.get(chatMessages.size() - 1);

			findChatMember.setLastCheckedMessage(lastChatMessage);
			chatMemberRepository.save(findChatMember);
		}

		List<ChatMessageDto> messageDtos = chatMessages
			.stream()
			.map(chatMessage -> modelMapper.map(chatMessage, ChatMessageDto.class))
			.collect(Collectors.toList());

		List<ChatUser> members = chatMembers
			.stream()
			.map(lastCheckedMessage -> modelMapper.map(lastCheckedMessage.getUser(), ChatUser.class))
			.collect(
				Collectors.toList());

		chatRoomService.enterChatRoom(roomId);

		return ChatRoomInfo.builder().roomId(roomId).members(members).messages(messageDtos).build();
	}

	@Override
	public void updateLastCheckedMessage(LastCheckedMessageRequest request, Long userId) {
		ChatMember chatMember = chatMemberRepository.findByRoomIdAndUserId(request.getRoomId(),
			request.getUserId()).orElseThrow(() -> new IllegalArgumentException());

		if (request.getUserId() != userId) {
			throw new UnauthChangeException();
		}

		chatMember.setLastCheckedMessage(ChatMessage.builder().id(request.getMessageId()).build());

		chatMemberRepository.save(chatMember);
	}

	@Override
	public void removeChatMember(Long lastCheckedMessageId, Long userId) {
		ChatMember chatMember = chatMemberRepository.findById(lastCheckedMessageId)
			.orElseThrow(() -> new IllegalArgumentException());

		if (chatMember.getUser().getId() != userId) {
			throw new UnauthChangeException();
		}

		chatMemberRepository.delete(chatMember);
	}

}
