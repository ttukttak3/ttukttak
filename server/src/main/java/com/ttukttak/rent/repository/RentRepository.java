package com.ttukttak.rent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.rent.entity.Rent;

public interface RentRepository extends JpaRepository<Rent, Long> {
	List<Rent> findAllByLenderIdAndIsReturnFalseOrderByBeginDateAsc(Long lenderId);

	List<Rent> findAllByOwnerIdAndIsReturnFalseOrderByBeginDateAsc(Long ownerId);
}
