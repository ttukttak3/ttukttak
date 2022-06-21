package com.ttukttak.chat;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.MessageType;
import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.entity.LastCheckedMessage;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.chat.repository.ChatRoomRepositoryCustom;
import com.ttukttak.chat.repository.LastCheckedMessageRepository;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

@SpringBootTest
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
	ChatRoomRepositoryCustom chatRoomRepositoryCustom;

	@Autowired
	ModelMapper modelMapper;

	@Test
	@DisplayName("ChatMessageDto 맵핑")
	void chatMessageDto() {
		User user = User.builder().email("user@naver.com").age("20").name("테스터").gender("M").build();

		userRepository.save(user);

		Book book = Book.builder().owner(user).build();
		bookRepository.save(book);

		ChatRoom chatRoom = ChatRoom.builder().book(book).build();

		LastCheckedMessage lastCheckedMessage = LastCheckedMessage.builder().user(user).build();

		chatRoom.addLastCheckedMessage(lastCheckedMessage);

		chatRoomRepository.save(chatRoom);

		ChatMessage chatMessage = ChatMessage.builder()
			.message("test message")
			.chatRoom(chatRoom)
			.user(user)
			.messageType(MessageType.TEXT)
			.build();

		chatMessageRepository.save(chatMessage);

		ChatMessageDto chatMessageDto = modelMapper.map(chatMessage, ChatMessageDto.class);

		System.out.println(chatMessageDto);

		Assertions.assertThat(chatMessageDto.getId()).isEqualTo(chatMessage.getId());
		Assertions.assertThat(chatMessageDto.getUserId()).isEqualTo(chatMessage.getUser().getId());
		Assertions.assertThat(chatMessageDto.getRoomId()).isEqualTo(chatMessage.getChatRoom().getId());
		Assertions.assertThat(chatMessageDto.getMessage()).isEqualTo(chatMessage.getMessage());
		Assertions.assertThat(chatMessageDto.getMessageType()).isEqualTo(chatMessage.getMessageType());
		Assertions.assertThat(chatMessageDto.getSendedAt()).isEqualTo(chatMessage.getSendedAt());

	}

	@Test
	@DisplayName("ChatRoomCard 맵핑")
	void chatRoomCard() {
		User user = User.builder().email("user@naver.com").age("20").name("테스터").gender("M").build();

		userRepository.save(user);

		Book book = Book.builder().owner(user).build();
		bookRepository.save(book);

		ChatRoom chatRoom = ChatRoom.builder().book(book).build();

		LastCheckedMessage lastCheckedMessage = LastCheckedMessage.builder().user(user).build();

		chatRoom.addLastCheckedMessage(lastCheckedMessage);

		chatRoomRepository.save(chatRoom);

		ChatMessage chatMessage = ChatMessage.builder()
			.message("test message")
			.chatRoom(chatRoom)
			.user(user)
			.messageType(MessageType.TEXT)
			.build();

		chatMessageRepository.save(chatMessage);

		lastCheckedMessage.setChatMessage(chatMessage);

		lastCheckedMessageRepository.save(lastCheckedMessage);

		LastCheckedMessage findMessage = chatRoomRepositoryCustom.findAllChatRoomByUserId(user.getId()).get(0);

		// ChatRoomCard chatRoomCard = modelMapper.typeMap(ChatRoom.class, ChatRoomCard.class)
		// 	.addMappings(mapper -> {
		// 		mapper.map(ChatRoom::getLastCheckedMessages)
		// 	})

		// System.out.println(chatRoomCard);

		Assertions.assertThat(findMessage.getId()).isEqualTo(lastCheckedMessage.getId());
		// Assertions.assertThat(chatRoomCard.getRoomId()).isEqualTo(chatRoom.getId());
		// ChatRoomCard card = cardList.get(0);

		// System.out.println(cardList.get(0).toString());

		// Assertions.assertThat(cardList.size()).isEqualTo(1);

	}

}
