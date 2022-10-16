package com.ttukttak.rent;

import static org.assertj.core.api.Assertions.*;
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
import com.ttukttak.oauth.dto.UserDto;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;
import com.ttukttak.rent.dto.CreateRentRequest;
import com.ttukttak.rent.dto.RentResponse;
import com.ttukttak.rent.entity.Rent;
import com.ttukttak.rent.repository.ExtendRepository;
import com.ttukttak.rent.repository.RentRepository;
import com.ttukttak.rent.service.RentService;
import com.ttukttak.rent.service.RentServiceImpl;

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

	@Nested
	@DisplayName("대여 생성하기")
	class AddRent {
		private Rent rent;
		private User owner;
		private User lender;
		private Book book;
		private ChatRoom room;
		private ChatMember memberOwner;
		private ChatMember memberLender;

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
			memberOwner = ChatMember.builder().id(1L).book(book).room(room).user(owner).build();
			memberLender = ChatMember.builder().id(2L).book(book).room(room).user(lender).build();
			room.addChatMember(memberOwner);
			room.addChatMember(memberLender);
			rent = Rent.builder().id(1L).book(book).lender(lender).room(room).beginDate(LocalDate.now()).build();
		}

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
		}
	}

}
