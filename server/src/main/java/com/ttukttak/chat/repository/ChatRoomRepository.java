package com.ttukttak.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
