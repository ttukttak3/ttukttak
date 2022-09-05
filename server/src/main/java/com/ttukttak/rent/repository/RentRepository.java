package com.ttukttak.rent.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ttukttak.oauth.entity.User;
import com.ttukttak.rent.entity.Rent;

public interface RentRepository extends JpaRepository<Rent, Long> {
	List<Rent> findAllByLenderIdAndReturnDateIsNullOrderByBeginDateAsc(Long lenderId);

	Page<Rent> findAllByLenderIdOrderByBeginDateDesc(Long lenderId, Pageable pageable);

	List<Rent> findAllByOwnerIdAndReturnDateIsNullOrderByBeginDateAsc(Long ownerId);

	Page<Rent> findAllByOwnerIdOrderByBeginDateDesc(Long ownerId, Pageable pageable);

	Optional<Rent> findByBookIdAndLenderIdAndReturnDateIsNull(Long bookId, Long lenderId);

	@Override
	Page<Rent> findAll(Pageable pageable);

	Optional<List<Rent>> findAllByLenderIdAndReturnDateIsNull(Long userId);

	@Modifying
	@Query("update Rent m set m.lender = null where m.lender = :lender")
	void setNullLender(
		@Param("lender")
			User lender);

	@Modifying
	@Query("update Rent m set m.owner = null where m.owner = :owner")
	void setNullOwner(
		@Param("owner")
			User owner);
}
