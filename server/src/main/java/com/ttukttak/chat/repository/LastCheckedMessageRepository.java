package com.ttukttak.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.LastCheckedMessage;

public interface LastCheckedMessageRepository
	extends JpaRepository<LastCheckedMessage, Long>, LastCheckedMessageRepositoryCustom {
	Optional<LastCheckedMessage> findByRoomIdAndUserId(Long roomId, Long userId);

	List<LastCheckedMessage> findAllByRoomId(Long roomId);
}
