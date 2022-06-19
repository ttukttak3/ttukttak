package com.ttukttak.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.repository.ChatMessageRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {
	@Autowired
	private final ChatMessageRepository chatMessageRepository;
	private final ObjectMapper objectMapper;
	private final RedisTemplate redisTemplate;
	private final SimpMessageSendingOperations messagingTemplate;

	/**
	 * Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리한다.
	 */
	@Override
	public void onMessage(Message message, byte[] pattern) {
		try {
			// redis에서 발행된 데이터를 받아 deserialize
			String publishMessage = (String)redisTemplate.getStringSerializer().deserialize(message.getBody());
			ChatMessageDto roomMessage = objectMapper.readValue(publishMessage, ChatMessageDto.class);

			chatMessageRepository.save(ChatMessage.of(roomMessage));

			log.info("redis 수신 : {}", roomMessage);
			// Websocket 구독자에게 채팅 메시지 Send
			messagingTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getRoomId(), roomMessage);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
}
