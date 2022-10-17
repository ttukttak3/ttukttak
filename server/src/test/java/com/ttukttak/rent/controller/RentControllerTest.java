package com.ttukttak.rent.controller;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttukttak.address.entity.Town;
import com.ttukttak.address.repository.TownRepository;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.chat.entity.ChatMember;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.entity.UserPrincipal;
import com.ttukttak.oauth.repository.UserRepository;
import com.ttukttak.rent.dto.CreateRentRequest;
import com.ttukttak.rent.entity.Rent;
import com.ttukttak.rent.repository.RentRepository;

@Transactional
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class RentControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private ChatRoomRepository chatRoomRepository;
	@Autowired
	private RentRepository rentRepository;

	@Autowired
	private TownRepository townRepository;

	@Autowired
	private ObjectMapper objectMapper;

	private User owner;
	private User lender;
	private User unknown;
	private Book book;
	private ChatRoom room;

	@BeforeEach
	void setup() {
		owner = User.builder()
			.age("20")
			.email("test1@naver.com")
			.gender("MALE")
			.nickname("tester1")
			.build();
		lender = User.builder()
			.age("21")
			.email("test2@naver.com")
			.gender("FEMALE")
			.nickname("tester2")
			.build();

		unknown = User.builder()
			.age("21")
			.email("test3@naver.com")
			.gender("FEMALE")
			.nickname("tester3")
			.build();

		owner = userRepository.save(owner);
		lender = userRepository.save(lender);
		unknown = userRepository.save(unknown);

		Town town = Town.builder().id(1L).city("seoul").build();
		townRepository.save(town);

		book = Book.builder().owner(owner).town(town).build();
		room = ChatRoom.builder().book(book).build();
		ChatMember memberOwner = ChatMember.builder().book(book).room(room).user(owner).build();
		ChatMember memberLender = ChatMember.builder().book(book).room(room).user(lender).build();
		room.addChatMember(memberOwner);
		room.addChatMember(memberLender);

		book = bookRepository.save(book);
		room = chatRoomRepository.save(room);
	}

	@Nested
	@DisplayName("/api/v1/rent")
	class PostRentTest {
		private CreateRentRequest createRentRequest;


		@BeforeEach
		void setup() {
			createRentRequest = new CreateRentRequest();
			createRentRequest.setBookId(book.getId());
			createRentRequest.setLenderId(lender.getId());
			createRentRequest.setRoomId(room.getId());
		}

		@Test
		@DisplayName("성공 케이스")
		public void createRentSuccess() throws Exception {
			UserPrincipal currentUser = UserPrincipal.create(owner);

			mockMvc.perform(post("/api/v1/rent")
					.with(user(currentUser))
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(createRentRequest)))
				.andExpect(status().is(201));
		}

		@Test
		@DisplayName("현재 대여중인 도서를 대여하는 경우")
		public void createRentfail1() throws Exception {

			UserPrincipal currentUser = UserPrincipal.create(owner);

			mockMvc.perform(post("/api/v1/rent")
					.with(user(currentUser))
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(createRentRequest)))
				.andExpect(status().is(201));

			mockMvc.perform(post("/api/v1/rent")
					.with(user(currentUser))
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(createRentRequest)))
				.andExpect(status().is(400));
		}

		@Test
		@DisplayName("요청하는 유저가 도서 owner가 아닌 경우")
		public void createRentfail2() throws Exception {

			UserPrincipal currentUser = UserPrincipal.create(unknown);

			mockMvc.perform(post("/api/v1/rent")
					.with(user(currentUser))
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(createRentRequest)))
				.andExpect(status().is(401));
		}

		@Test
		@DisplayName("대여자와 차입자가 동일한 경우")
		public void createRentfail3() throws Exception {
			createRentRequest.setLenderId(owner.getId());
			UserPrincipal currentUser = UserPrincipal.create(owner);

			mockMvc.perform(post("/api/v1/rent")
					.with(user(currentUser))
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(createRentRequest)))
				.andExpect(status().is(400));
		}

	}

}
