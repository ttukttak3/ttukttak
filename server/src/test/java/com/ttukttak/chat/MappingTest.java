package com.ttukttak.chat;

import java.util.stream.Collectors;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatUser;
import com.ttukttak.chat.dto.MessageType;
import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.entity.LastCheckedMessage;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.chat.repository.LastCheckedMessageRepository;
import com.ttukttak.common.config.TestConfig;
import com.ttukttak.common.config.UtilConfig;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({TestConfig.class, UtilConfig.class})
// @Import(UtilConfig.class)
public class MappingTest {
	@Autowired
	UserRepository userRepository;

	@Autowired
	ChatMessageRepository chatMessageRepository;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	ChatRoomRepository chatRoomRepository;

	@Autowired
	LastCheckedMessageRepository lastCheckedMessageRepository;

	@Autowired
	ModelMapper modelMapper;

	@Test
	@DisplayName("ChatMessageDto 맵핑")
	void chatMessageDto() {
		User user = User.builder().email("user@naver.com").age("20").nickname("테스터").gender("M").build();

		userRepository.save(user);

		Book book = Book.builder().owner(user).build();
		bookRepository.save(book);

		ChatRoom chatRoom = ChatRoom.builder().book(book).build();

		LastCheckedMessage lastCheckedMessage = LastCheckedMessage.builder().user(user).build();

		chatRoom.addLastCheckedMessage(lastCheckedMessage);

		ChatMessage chatMessage = ChatMessage.builder()
			.message("test message")
			.user(user)
			.messageType(MessageType.TEXT)
			.build();

		chatRoom.addMessage(chatMessage);

		chatRoomRepository.save(chatRoom);

		ChatMessageDto chatMessageDto = modelMapper.map(chatMessage, ChatMessageDto.class);

		Assertions.assertThat(chatMessageDto.getId()).isEqualTo(chatMessage.getId());
		Assertions.assertThat(chatMessageDto.getUserId()).isEqualTo(chatMessage.getUser().getId());
		Assertions.assertThat(chatMessageDto.getRoomId()).isEqualTo(chatMessage.getChatRoom().getId());
		Assertions.assertThat(chatMessageDto.getMessage()).isEqualTo(chatMessage.getMessage());
		Assertions.assertThat(chatMessageDto.getMessageType()).isEqualTo(chatMessage.getMessageType());
		Assertions.assertThat(chatMessageDto.getSendedAt()).isEqualTo(chatMessage.getSendedAt());

	}

	@Test
	@DisplayName("ChatRoomInfo 맵핑")
	void chatRoomInfo() {
		User user = User.builder().email("user@naver.com").age("20").nickname("테스터").gender("M").build();
		User user2 = User.builder().email("user2@naver.com").age("20").nickname("테스터2").gender("M").build();


		userRepository.save(user);
		userRepository.save(user2);

		Book book = Book.builder().owner(user).build();
		bookRepository.save(book);

		ChatRoom chatRoom = ChatRoom.builder().book(book).build();

		LastCheckedMessage lastCheckedMessage = LastCheckedMessage.builder().user(user).build();
		LastCheckedMessage lastCheckedMessage2 = LastCheckedMessage.builder().user(user2).build();

		chatRoom.addLastCheckedMessage(lastCheckedMessage);
		chatRoom.addLastCheckedMessage(lastCheckedMessage2);

		ChatMessage chatMessage = ChatMessage.builder()
			.message("test message")
			.user(user)
			.messageType(MessageType.TEXT)
			.build();

		chatRoom.addMessage(chatMessage);

		chatRoomRepository.save(chatRoom);

		ChatRoomInfo chatRoomInfo = modelMapper.map(chatRoom, ChatRoomInfo.class);

		Assertions.assertThat(chatRoomInfo.getRoomId()).isEqualTo(chatRoom.getId());
		Assertions.assertThat(chatRoomInfo.getMembers().stream().map(ChatUser::getId).collect(Collectors.toList()))
			.contains(user.getId(), user2.getId());

		Assertions.assertThat(chatRoomInfo.getMessages().get(0).getId()).isEqualTo(chatMessage.getId());
		Assertions.assertThat(chatRoomInfo.getMessages().get(0).getMessage()).isEqualTo(chatMessage.getMessage());
		Assertions.assertThat(chatRoomInfo.getMessages().get(0).getMessageType())
			.isEqualTo(chatMessage.getMessageType());
		Assertions.assertThat(chatRoomInfo.getMessages().get(0).getSendedAt()).isEqualTo(chatMessage.getSendedAt());

	}

}
