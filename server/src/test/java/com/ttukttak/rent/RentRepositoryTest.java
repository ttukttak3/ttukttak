package com.ttukttak.rent;

import java.time.LocalDate;
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

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.BookCategory;
import com.ttukttak.book.repository.BookCategoryRepositroy;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.common.config.QuerydslConfig;
import com.ttukttak.common.exception.InvalidParameterException;
import com.ttukttak.oauth.entity.Role;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;
import com.ttukttak.rent.entity.Rent;
import com.ttukttak.rent.repository.RentRepository;

/*
1. 대여 리스트 조회
2. 대여 상세조회
3. 대여 등록
4. 대여 상태변경
5. 대여 삭제


 */

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(QuerydslConfig.class)
// @SpringBootTest
public class RentRepositoryTest {

	@Autowired
	RentRepository rentRepository;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	BookCategoryRepositroy categoryRepositroy;

	Book book;

	User owner;
	User lender1;
	User lender2;

	@BeforeEach
	void insertBook() {
		owner = User.builder().email("test1@naver.com").age("20").nickname("owner").role(Role.USER).build();
		lender1 = User.builder().email("test2@naver.com").age("20").nickname("lender1").role(Role.USER).build();
		lender2 = User.builder().email("test2@naver.com").age("20").nickname("lender2").role(Role.USER).build();

		userRepository.save(owner);
		userRepository.save(lender1);
		userRepository.save(lender2);

		BookCategory category = BookCategory.builder().name("장르").build();
		categoryRepositroy.save(category);

		book = Book.builder().owner(owner).author("저자").content("도서 설명").bookCategory(category).build();
		bookRepository.save(book);
	}

	@Nested
	@DisplayName("조회 테스트")
	class GetTest {
		@BeforeEach
		void insertRent() {
			LocalDate beginDate1 = LocalDate.of(2022, 7, 11);
			LocalDate endDate1 = beginDate1.plusWeeks(1);

			LocalDate beginDate2 = endDate1.plusDays(1);
			LocalDate endDate2 = beginDate2.plusWeeks(2);

			LocalDate beginDate3 = endDate2.plusWeeks(1);
			LocalDate endDate3 = beginDate3.plusWeeks(1);

			Rent rent1 = Rent.builder()
				.book(book)
				.beginDate(LocalDate.now())
				.endDate(endDate1)
				.owner(owner)
				.lender(lender1)
				.build();

			Rent rent2 = Rent.builder()
				.book(book)
				.beginDate(beginDate2)
				.endDate(endDate2)
				.owner(owner)
				.lender(lender1)
				.build();

			Rent rent3 = Rent.builder()
				.book(book)
				.beginDate(beginDate3)
				.endDate(endDate3)
				.owner(owner)
				.lender(lender2)
				.build();

			rentRepository.save(rent1);
			rentRepository.save(rent2);
			rentRepository.save(rent3);
		}

		@Test
		@DisplayName("차입목록 조회")
		void borrowingList() {
			List<Rent> rentList = rentRepository.findAllByLenderIdAndIsReturnFalseOrderByBeginDateAsc(
				lender1.getId());

			Assertions.assertThat(rentList.size()).isEqualTo(2);
			Assertions.assertThat(rentList.get(0).getBeginDate()).isEqualTo(LocalDate.of(2022, 7, 11));
			Assertions.assertThat(rentList.get(1).getBeginDate())
				.isEqualTo(LocalDate.of(2022, 7, 11).plusDays(1).plusWeeks(1));
		}

		@Test
		@DisplayName("대여목록 조회")
		void rentList() {
			List<Rent> rentList = rentRepository.findAllByOwnerIdAndIsReturnFalseOrderByBeginDateAsc(owner.getId());

			Assertions.assertThat(rentList.size()).isEqualTo(3);
			Assertions.assertThat(rentList.get(0).getBeginDate()).isEqualTo(LocalDate.of(2022, 7, 11));
			Assertions.assertThat(rentList.get(1).getBeginDate())
				.isEqualTo(LocalDate.of(2022, 7, 11).plusWeeks(1).plusDays(1));
			Assertions.assertThat(rentList.get(2).getLender().getNickname()).isEqualTo("lender2");
		}
	}

	@Nested
	@DisplayName("생성 테스트")
	class PostTest {

		@Test
		@DisplayName("대여자와 차입자가 동일한 경우 예외처리")
		void create() {
			Assertions.assertThatThrownBy(() -> {
				LocalDate beginDate = LocalDate.of(2022, 7, 11);
				LocalDate endDate = beginDate.plusWeeks(1);

				Rent rent3 = Rent.builder()
					.book(book)
					.beginDate(beginDate)
					.endDate(endDate)
					.owner(owner)
					.lender(owner)
					.build();
			}).isInstanceOf(InvalidParameterException.class);
		}
	}

	@Nested
	@DisplayName("상태 변경 테스트")
	class PatchTest {

	}
}
