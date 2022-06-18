package com.ttukttak.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttukttak.address.entity.Town;

@Repository
public interface TownRepository extends JpaRepository<Town, Long> {

}
