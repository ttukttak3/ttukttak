package com.ttukttak.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ttukttak.chat.entity.ChatMember;
import com.ttukttak.oauth.entity.User;

public interface ChatMemberRepository
	extends JpaRepository<ChatMember, Long>, ChatMemberRepositoryCustom {
	Optional<ChatMember> findByUserIdAndBookId(Long userId, Long bookId);

	Optional<ChatMember> findByUserId(Long userId);

	List<ChatMember> findAllByRoomId(Long roomId);

	List<ChatMember> findAllByUserId(Long userId);

	@Modifying
	@Query("update ChatMember m set m.user = null where m.user = :user")
	void setNullUser(
		@Param("user")
		User user);
}
