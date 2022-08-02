package com.ttukttak.book.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookStatus;
import com.ttukttak.oauth.entity.User;

public interface BookRepository extends JpaRepository<Book, Long> {

	Page<Book> findByIsDeleteFalseAndOwnerId(Long ownerId, PageRequest pageRequest);

	Page<Book> findByStatusInAndIsDeleteFalseAndIsHideFalseAndSubjectContainsAndTownIdIn(List<BookStatus> bookStatus,
		String query,
		List<Long> townIdList, PageRequest pageRequest);

	Page<Book> findByStatusInAndIsDeleteFalseAndIsHideFalseAndSubjectContainsAndTownIdInAndBookCategoryId(
		List<BookStatus> bookStatus,
		String query, List<Long> townIdList, Long categoryId, PageRequest pageRequest);

	Optional<List<Book>> findAllByOwnerId(Long userId);

	@Modifying
	@Query("update Book m set m.owner = null where m.owner = :owner")
	void setNullOwner(
		@Param("owner")
		User owner);

}