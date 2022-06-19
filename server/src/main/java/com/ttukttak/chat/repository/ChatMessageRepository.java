package com.ttukttak.chat.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
	List<ChatMessage> findAllByChatRoomIdOrderBySendedAtAsc(Long roomId);

	int countByChatRoomIdAndSendedAtAfterAndUserIdNot(Long roomId, LocalDateTime sendedAt, Long userId);

	ChatMessage findFirstByChatRoomIdOrderBySendedAtDesc(Long roomId);
}
