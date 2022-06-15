package com.ttukttak.chat.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.ttukttak.chat.dto.ChatMessageDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RedisPublisher {
	private final RedisTemplate<String, Object> redisTemplate;

	/**
	 * Redis로 메세지 보냄
	 * @param topic
	 * @param message
	 */
	public void publish(ChannelTopic topic, ChatMessageDto message) {
		redisTemplate.convertAndSend(topic.getTopic(), message);
	}
}
