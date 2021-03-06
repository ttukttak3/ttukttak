package com.ttukttak.book.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.BookStatus;

public interface BookRepository extends JpaRepository<Book, Long> {

	Page<Book> findByOwnerId(Long ownerId, PageRequest pageRequest);

	Page<Book> findByStatusInAndIsDeleteFalseAndSubjectContainsAndTownIdIn(List<BookStatus> bookStatus, String query,
		List<Long> townIdList, PageRequest pageRequest);

	Page<Book> findByStatusInAndIsDeleteFalseAndSubjectContainsAndTownIdInAndBookCategoryId(List<BookStatus> bookStatus,
		String query, List<Long> townIdList, Long categoryId, PageRequest pageRequest);

}