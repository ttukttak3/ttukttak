package com.ttukttak.oauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.oauth.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByProviderId(String id);

	Optional<User> findByEmail(String email);

}
