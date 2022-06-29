package com.ttukttak.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.book.entity.BookCategory;

public interface BookCategoryRepositroy extends JpaRepository<BookCategory, Long> {

}
