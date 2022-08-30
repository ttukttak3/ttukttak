package com.ttukttak.book;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.ttukttak.book.dto.BookReviewRequest;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.BookCategory;
import com.ttukttak.book.entity.BookReview;
import com.ttukttak.book.repository.BookCategoryRepositroy;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.book.repository.BookReviewRepository;
import com.ttukttak.common.config.QuerydslConfig;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(QuerydslConfig.class)
public class ReviewsTest {
	@Autowired
	BookReviewRepository bookReviewRepository;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	BookCategoryRepositroy categoryRepositroy;

	@Autowired
	UserRepository userRepository;

	User reviewer;
	User owner;
	Book book;

	@BeforeEach
	void initData() {
		reviewer = userRepository.save(User.builder().email("reviewer").nickname("리뷰어").build());
		owner = userRepository.save(User.builder().email("owner@test.com").nickname("도서주인").build());

		BookCategory category = categoryRepositroy.save(BookCategory.builder().name("기술").build());

		book = bookRepository
			.save(
				Book.builder()
					.owner(owner)
					.bookCategory(category)
					.author("저자")
					.content("내용")
					.subject("제목")
					.build());
	}

	@Test
	@DisplayName("리뷰 등록 테스트")
	void review등록() {
		BookReviewRequest request = new BookReviewRequest("리뷰달았다.", 3.5);

		BookReview bookReview = BookReview.builder()
			.book(book)
			.content(request.getContent())
			.rating(request.getRating())
			.reviewer(reviewer)
			.build();

		bookReview = bookReviewRepository.save(bookReview);

		Assertions.assertThat(bookReview.getId()).isNotNull();
	}

	@Nested
	@DisplayName("리뷰 등록 조회 테스트")
	class review조회 {
		@BeforeEach
		void initData() {
			BookReviewRequest request = new BookReviewRequest("4점리뷰요", 4.0);

			BookReview bookReview = BookReview.builder()
				.book(book)
				.content(request.getContent())
				.rating(request.getRating())
				.reviewer(reviewer)
				.build();

			BookReviewRequest request2 = new BookReviewRequest("3점리뷰요", 3.0);

			BookReview bookReview2 = BookReview.builder()
				.book(book)
				.content(request2.getContent())
				.rating(request2.getRating())
				.reviewer(reviewer)
				.build();

			BookReviewRequest request3 = new BookReviewRequest("1.5점리뷰요", 1.5);

			BookReview bookReview3 = BookReview.builder()
				.book(book)
				.content(request3.getContent())
				.rating(request3.getRating())
				.reviewer(reviewer)
				.build();

			bookReviewRepository.save(bookReview);
			bookReviewRepository.save(bookReview2);
			bookReviewRepository.save(bookReview3);
		}

		@Test
		@DisplayName("리뷰 목록 조회")
		void getReviews() {
			//entity 조회 -> from book_review
			List<BookReview> reviews = bookReviewRepository.findAllByBook(book);

			//id 조회 -> from book_review left outer join book on bookreview.book_id=book.id
			List<BookReview> reviews2 = bookReviewRepository.findAllByBookId(book.getId());

			//find시에 id값으로 조회시 join이 발생함을 알자

			Assertions.assertThat(reviews.size()).isEqualTo(3);

		}

	}
}
