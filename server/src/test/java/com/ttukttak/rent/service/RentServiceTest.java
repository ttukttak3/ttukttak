package com.ttukttak.rent.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ttukttak.address.entity.Town;
import com.ttukttak.book.dto.BookDto;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.chat.entity.ChatMember;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.common.exception.DuplicatedException;
import com.ttukttak.common.exception.UnauthChangeException;
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;
import com.ttukttak.rent.dto.CreateRentRequest;
import com.ttukttak.rent.dto.ExtendResponse;
import com.ttukttak.rent.dto.RentResponse;
import com.ttukttak.rent.entity.Extend;
import com.ttukttak.rent.entity.Rent;
import com.ttukttak.rent.repository.ExtendRepository;
import com.ttukttak.rent.repository.RentRepository;

@ExtendWith(MockitoExtension.class)
public class RentServiceTest {
	@Mock
	private RentRepository rentRepository;
	@Mock
	private ExtendRepository extendRepository;
	@Mock
	private BookRepository bookRepository;
	@Mock
	private UserRepository userRepository;
	@Mock
	private ChatRoomRepository chatRoomRepository;

	@InjectMocks
	private RentServiceImpl rentService;
	private Rent rent;
	private User owner;
	private User lender;
	private Book book;
	private ChatRoom room;

	@BeforeEach
	void setup() {
		owner = User.builder()
			.id(1L)
			.age("20")
			.email("test1@naver.com")
			.gender("MALE")
			.nickname("tester1")
			.build();
		lender = User.builder()
			.id(2L)
			.age("21")
			.email("test2@naver.com")
			.gender("FEMALE")
			.nickname("tester2")
			.build();
		book = Book.builder().id(1L).owner(owner).town(Town.builder().id(1L).build()).build();
		room = ChatRoom.builder().id(1L).book(book).build();
		ChatMember memberOwner = ChatMember.builder().id(1L).book(book).room(room).user(owner).build();
		ChatMember memberLender = ChatMember.builder().id(2L).book(book).room(room).user(lender).build();
		room.addChatMember(memberOwner);
		room.addChatMember(memberLender);
		rent = Rent.builder().id(1L).book(book).lender(lender).room(room).beginDate(LocalDate.now()).build();
	}

	@Nested
	@DisplayName("대여 생성하기")
	class AddRentTest {
		@Nested
		@DisplayName("성공 케이스")
		class SuccessCase {
			@Test
			@DisplayName("대여 생성")
			void createRentSuccess() {
				//given
				when(bookRepository.findById(book.getId())).thenReturn(Optional.ofNullable(book));
				when(userRepository.findById(lender.getId())).thenReturn(Optional.ofNullable(lender));
				when(userRepository.findById(owner.getId())).thenReturn(Optional.ofNullable(owner));
				when(chatRoomRepository.findById(room.getId())).thenReturn(Optional.ofNullable(room));

				CreateRentRequest request = new CreateRentRequest();
				request.setBookId(book.getId());
				request.setLenderId(lender.getId());
				request.setRoomId(room.getId());

				when(rentRepository.findByBookIdAndLenderIdAndReturnDateIsNull(request.getBookId(),
					request.getLenderId())).thenReturn(Optional.ofNullable(null));
				when(rentRepository.save(any(Rent.class))).thenReturn(rent);

				// when
				RentResponse rentResponse = rentService.addRent(request, owner.getId());

				// then
				assertThat(rentResponse.getId()).isEqualTo(rent.getId());
				assertThat(rentResponse.getRoomId()).isEqualTo(room.getId());
				assertThat(rentResponse.getBook()).usingRecursiveComparison().isEqualTo(BookDto.from(book));
				assertThat(rentResponse.getOwner()).usingRecursiveComparison().isEqualTo(UserDto.from(owner));
				assertThat(rentResponse.getLender()).usingRecursiveComparison().isEqualTo(UserDto.from(lender));
				assertThat(rentResponse.getStatus()).isEqualTo(Rent.RentStatus.RENTED);
				assertThat(rentResponse.getReturnDate()).isNull();
			}
		}

		@Nested
		@DisplayName("실패 케이스")
		class FailCase {
			@Test
			@DisplayName("동일한 도서에 반납하지 않은 대여내역이 있는 경우")
			void createRentFail1() {
				//given
				when(bookRepository.findById(book.getId())).thenReturn(Optional.ofNullable(book));
				when(userRepository.findById(lender.getId())).thenReturn(Optional.ofNullable(lender));
				when(userRepository.findById(owner.getId())).thenReturn(Optional.ofNullable(owner));
				when(chatRoomRepository.findById(room.getId())).thenReturn(Optional.ofNullable(room));

				CreateRentRequest request = new CreateRentRequest();
				request.setBookId(book.getId());
				request.setLenderId(lender.getId());
				request.setRoomId(room.getId());

				when(rentRepository.findByBookIdAndLenderIdAndReturnDateIsNull(request.getBookId(),
					request.getLenderId())).thenReturn(Optional.ofNullable(rent));

				// when, then
				assertThrows(DuplicatedException.class, () -> rentService.addRent(request, owner.getId()));
			}

			@Test
			@DisplayName("대여 생성 호출자가 도서 owner가 아닌 경우")
			void createRentFail2() {
				//given
				final Long UNDEFINED_USER_ID = 3L;

				User other = User.builder().id(UNDEFINED_USER_ID).age("21")
					.email("test3@naver.com")
					.gender("FEMALE")
					.nickname("tester3")
					.build();

				when(bookRepository.findById(book.getId())).thenReturn(Optional.ofNullable(book));
				when(userRepository.findById(lender.getId())).thenReturn(Optional.ofNullable(lender));
				when(chatRoomRepository.findById(room.getId())).thenReturn(Optional.ofNullable(room));
				when(userRepository.findById(UNDEFINED_USER_ID)).thenReturn(Optional.ofNullable(other));

				CreateRentRequest request = new CreateRentRequest();
				request.setBookId(book.getId());
				request.setLenderId(lender.getId());
				request.setRoomId(room.getId());

				// when, then
				assertThrows(UnauthChangeException.class, () -> rentService.addRent(request, UNDEFINED_USER_ID));
			}

			@Test
			@DisplayName("도서 ID가 없는 경우")
			void createRentFail3() {
				//given
				when(bookRepository.findById(book.getId())).thenReturn(Optional.ofNullable(null));

				CreateRentRequest request = new CreateRentRequest();
				request.setBookId(book.getId());
				request.setLenderId(lender.getId());
				request.setRoomId(room.getId());

				// when, then
				assertThrows(IllegalArgumentException.class, () -> rentService.addRent(request, owner.getId()));
			}

			@Test
			@DisplayName("빌리는 사람 ID가 없는 경우")
			void createRentFail4() {
				//given
				when(bookRepository.findById(book.getId())).thenReturn(Optional.ofNullable(book));
				when(userRepository.findById(lender.getId())).thenReturn(Optional.ofNullable(null));

				CreateRentRequest request = new CreateRentRequest();
				request.setBookId(book.getId());
				request.setLenderId(lender.getId());
				request.setRoomId(room.getId());

				// when, then
				assertThrows(IllegalArgumentException.class, () -> rentService.addRent(request, owner.getId()));
			}

			@Test
			@DisplayName("채팅방 ID가 없는 경우")
			void createRentFail5() {
				//given
				when(bookRepository.findById(book.getId())).thenReturn(Optional.ofNullable(book));
				when(userRepository.findById(lender.getId())).thenReturn(Optional.ofNullable(lender));
				when(chatRoomRepository.findById(room.getId())).thenReturn(Optional.ofNullable(null));

				CreateRentRequest request = new CreateRentRequest();
				request.setBookId(book.getId());
				request.setLenderId(lender.getId());
				request.setRoomId(room.getId());

				// when, then
				assertThrows(IllegalArgumentException.class, () -> rentService.addRent(request, owner.getId()));
			}
		}
	}

	@Nested
	@DisplayName("반납하기")
	class ChangeRentStatusTest {
		@Nested
		@DisplayName("성공 케이스")
		class SuccessCase {
			@Test
			@DisplayName("반납 성공")
			void returnSuccess() {
				// given
				when(rentRepository.findById(rent.getId())).thenReturn(Optional.ofNullable(rent));
				when(userRepository.findById(owner.getId())).thenReturn(Optional.ofNullable(owner));
				when(rentRepository.save(any(Rent.class))).thenReturn(rent);

				// when
				RentResponse rentResponse = rentService.changeRentStatus(rent.getId(), owner.getId());

				// then
				assertThat(rentResponse.getId()).isEqualTo(rent.getId());
				assertThat(rentResponse.getRoomId()).isEqualTo(room.getId());
				assertThat(rentResponse.getBook()).usingRecursiveComparison().isEqualTo(BookDto.from(book));
				assertThat(rentResponse.getOwner()).usingRecursiveComparison().isEqualTo(UserDto.from(owner));
				assertThat(rentResponse.getLender()).usingRecursiveComparison().isEqualTo(UserDto.from(lender));
				assertThat(rentResponse.getStatus()).isEqualTo(Rent.RentStatus.RETURN);
				assertThat(rentResponse.getReturnDate()).isNotNull();
			}
		}

		@Nested
		@DisplayName("실패 케이스")
		class FailCase {
			@Test
			@DisplayName("대여 ID가 없는 경우")
			void returnFail1() {
				// given
				when(rentRepository.findById(rent.getId())).thenReturn(Optional.ofNullable(null));

				// when, then
				assertThrows(IllegalArgumentException.class,
					() -> rentService.changeRentStatus(rent.getId(), owner.getId()));
			}

			@Test
			@DisplayName("반납하는 대상이 도서 owner가 아닌 경우")
			void returnFail2() {
				// given
				final Long UNDEFINED_USER_ID = 3L;

				User other = User.builder().id(UNDEFINED_USER_ID).age("21")
					.email("test3@naver.com")
					.gender("FEMALE")
					.nickname("tester3")
					.build();

				when(rentRepository.findById(rent.getId())).thenReturn(Optional.ofNullable(rent));
				when(userRepository.findById(UNDEFINED_USER_ID)).thenReturn(Optional.ofNullable(other));

				// when, then
				assertThrows(UnauthChangeException.class,
					() -> rentService.changeRentStatus(rent.getId(), UNDEFINED_USER_ID));
			}

			@Test
			@DisplayName("이미 반납된 대여 데이터를 다시 반납하는 경우")
			void returnFail3() {
				// given
				when(rentRepository.findById(rent.getId())).thenReturn(Optional.ofNullable(rent));
				when(userRepository.findById(owner.getId())).thenReturn(Optional.ofNullable(owner));

				// when
				rent.returnBook();

				// then
				assertThrows(IllegalArgumentException.class,
					() -> rentService.changeRentStatus(rent.getId(), owner.getId()));
			}
		}

	}

	@Nested
	@DisplayName("대여기간 연장하기")
	class AddExtendTest {
		final int EXTEND_DAYS = 7;

		@Nested
		@DisplayName("성공 케이스")
		class SuccessCase {
			@Test
			@DisplayName("연장 1회 성공")
			void addExtendSuccess() {
				// given
				LocalDate beforExtend = rent.getEndDate();

				when(rentRepository.findById(rent.getId())).thenReturn(Optional.ofNullable(rent));
				when(userRepository.findById(owner.getId())).thenReturn(Optional.ofNullable(owner));
				when(extendRepository.save(any(Extend.class))).thenReturn(any(Extend.class));

				// when
				ExtendResponse extendResponse = rentService.addExtend(rent.getId(), owner.getId());
				Extend extend = Extend.builder().rent(rent).extendDays(EXTEND_DAYS).build();
				rent.getExtendList().add(extend);

				// then
				assertThat(extendResponse.getExtendDate()).isEqualTo(beforExtend);
				assertThat(rent.getEndDate()).isEqualTo(beforExtend.plusDays(EXTEND_DAYS));
			}

			@Test
			@DisplayName("연장 2회 성공")
			void addExtendSuccess2() {
				// given
				LocalDate beforExtend = rent.getEndDate();
				Extend extend1 = Extend.builder().rent(rent).extendDays(EXTEND_DAYS).build();
				rent.getExtendList().add(extend1);

				when(rentRepository.findById(rent.getId())).thenReturn(Optional.ofNullable(rent));
				when(userRepository.findById(owner.getId())).thenReturn(Optional.ofNullable(owner));
				when(extendRepository.save(any(Extend.class))).thenReturn(any(Extend.class));

				// when
				ExtendResponse extendResponse = rentService.addExtend(rent.getId(), owner.getId());
				Extend extend2 = Extend.builder().rent(rent).extendDays(EXTEND_DAYS).build();
				rent.getExtendList().add(extend2);

				// then
				assertThat(extendResponse.getExtendDate()).isEqualTo(beforExtend.plusDays(EXTEND_DAYS));
				assertThat(rent.getEndDate()).isEqualTo(beforExtend.plusDays((EXTEND_DAYS * 2)));
			}
		}

	}

}
