package com.ttukttak.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ttukttak.book.entity.BookReview;
import com.ttukttak.oauth.entity.User;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {

	@Modifying
	@Query("update BookReview m set m.reviewer = null where m.reviewer = :reviewer")
	void setNullReviewer(
		@Param("reviewer")
		User reviewer);

}
