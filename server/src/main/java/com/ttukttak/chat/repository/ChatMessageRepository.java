package com.ttukttak.chat.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
	List<ChatMessage> findAllByChatRoomIdOrderBySendedAtAsc(Long roomId);

	int countByChatRoomIdAndMemberIdNotAndSendedAtAfter(Long roomId, Long memberId, LocalDateTime sendedAt);

	Optional<ChatMessage> findFirstByChatRoomIdOrderBySendedAtDesc(Long roomId);
}
