package com.ttukttak.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.ChatMember;

public interface ChatMemberRepository
	extends JpaRepository<ChatMember, Long>, ChatMemberRepositoryCustom {
	Optional<ChatMember> findByRoomIdAndUserId(Long roomId, Long userId);

	Optional<ChatMember> findByUserId(Long userId);

	List<ChatMember> findAllByRoomId(Long roomId);
}
