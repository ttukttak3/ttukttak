package com.ttukttak.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.book.entity.BookInfo;

public interface BookInfoRepository extends JpaRepository<BookInfo, Long> {

	BookInfo findByIsbn(String isbn);

}
