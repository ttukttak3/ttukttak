package com.ttukttak.chat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.ChatGuest;

public interface ChatGuestRepository extends JpaRepository<ChatGuest, Long> {
	Optional<ChatGuest> findByBookIdAndUserId(Long bookId, Long userId);
}
