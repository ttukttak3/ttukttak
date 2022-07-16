package com.ttukttak.rent.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.rent.entity.Rent;

public interface RentRepository extends JpaRepository<Rent, Long> {
	List<Rent> findAllByLenderIdAndIsReturnFalseOrderByBeginDateAsc(Long lenderId);

	Page<Rent> findAllByLenderIdAndIsReturnFalseOrderByBeginDateAsc(Long lenderId, Pageable pageable);

	List<Rent> findAllByOwnerIdAndIsReturnFalseOrderByBeginDateAsc(Long ownerId);

	Page<Rent> findAllByOwnerIdAndIsReturnFalseOrderByBeginDateAsc(Long ownerId, Pageable pageable);

	Optional<Rent> findByBookIdAndLenderId(Long bookId, Long lenderId);
}
