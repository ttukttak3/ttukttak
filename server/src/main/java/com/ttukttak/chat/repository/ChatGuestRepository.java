package com.ttukttak.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.ChatGuest;

public interface ChatGuestRepository extends JpaRepository<ChatGuest, Long> {
	boolean existsByBookIdAndUserId(Long bookId, Long userId);
}
