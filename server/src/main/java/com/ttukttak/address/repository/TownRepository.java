package com.ttukttak.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.address.entity.Town;

public interface TownRepository extends JpaRepository<Town, Long> {
}
