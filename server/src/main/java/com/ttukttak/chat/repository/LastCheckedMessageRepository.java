package com.ttukttak.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.LastCheckedMessage;

public interface LastCheckedMessageRepository extends JpaRepository<LastCheckedMessage, Long> {
	LastCheckedMessage findByRoomIdAndUserId(Long roomId, Long userId);

	List<LastCheckedMessage> findAllByRoomId(Long roomId);
}
