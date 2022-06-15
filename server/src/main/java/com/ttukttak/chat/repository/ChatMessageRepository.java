package com.ttukttak.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
	List<ChatMessage> findAllByRoomId(Long roomId);
}
