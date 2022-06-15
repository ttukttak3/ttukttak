package com.ttukttak.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.service.ChatRoomService;
import com.ttukttak.chat.service.RedisPublisher;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class WebSocketController {

	private final RedisPublisher redisPublisher;
	private final ChatRoomService chatRoomService;

	/**
	 * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
	 */
	@MessageMapping("/chat/message")
	public void message(ChatMessageDto message) {
		// Websocket에 발행된 메시지를 redis로 발행한다(publish)
		System.out.println("redis 전송 : " + message);
		redisPublisher.publish(chatRoomService.getTopic(message.getRoomId()), message);
	}
}