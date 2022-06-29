package com.ttukttak.oauth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.oauth.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByProviderId(String id);

	Optional<User> findByEmail(String email);

	Boolean existsByNicknameAndIdNot(String nickname, Long id);

}
