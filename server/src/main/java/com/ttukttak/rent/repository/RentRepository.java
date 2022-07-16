package com.ttukttak.rent.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.rent.entity.Rent;

public interface RentRepository extends JpaRepository<Rent, Long> {
	List<Rent> findAllByLenderIdAndReturnDateIsNullOrderByBeginDateAsc(Long lenderId);

	Page<Rent> findAllByLenderIdAndReturnDateIsNullOrderByBeginDateAsc(Long lenderId, Pageable pageable);

	List<Rent> findAllByOwnerIdAndReturnDateIsNullOrderByBeginDateAsc(Long ownerId);

	Page<Rent> findAllByOwnerIdAndReturnDateIsNullOrderByBeginDateAsc(Long ownerId, Pageable pageable);

	Optional<Rent> findByBookIdAndLenderId(Long bookId, Long lenderId);
}
