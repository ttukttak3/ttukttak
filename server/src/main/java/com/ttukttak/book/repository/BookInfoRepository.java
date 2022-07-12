package com.ttukttak.book.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.book.entity.BookInfo;

public interface BookInfoRepository extends JpaRepository<BookInfo, Long> {

	Optional<BookInfo> findByIsbn(String isbn);

}
