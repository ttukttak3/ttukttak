package com.ttukttak.address.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ttukttak.address.entity.Town;

public interface AddressRepository extends JpaRepository<Town, Long> {
	String nearQuery = "(6371*acos(cos(radians(:latitude))*cos(radians(m.latitude))"
		+ "*cos(radians(m.longitude) - radians(:longitude)) + sin(radians(:latitude))"
		+ "*sin(radians(m.latitude))))";
	String nearTownQuery = "select m from Town m where " + nearQuery + " < :ranged"
		+ " order by " + nearQuery;

	@Query(value = nearTownQuery)
	List<Town> getNearTown(@Param("latitude")
	Double latitude, @Param("longitude")
	Double longitude, @Param("ranged")
	Double ranged);

}
