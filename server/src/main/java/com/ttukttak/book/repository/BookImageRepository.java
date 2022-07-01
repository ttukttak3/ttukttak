package com.ttukttak.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.book.entity.BookImage;

public interface BookImageRepository extends JpaRepository<BookImage, Long> {

	BookImage findByImageUrlAndBookId(String url, Long id);

}
