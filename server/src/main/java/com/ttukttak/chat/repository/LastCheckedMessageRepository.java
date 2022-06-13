package com.ttukttak.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.chat.entity.LastCheckedMessage;

public interface LastCheckedMessageRepository extends JpaRepository<LastCheckedMessage, Long> {
}
