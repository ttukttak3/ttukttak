package com.ttukttak.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.book.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}
