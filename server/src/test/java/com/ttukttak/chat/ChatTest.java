package com.ttukttak.chat;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.entity.LastCheckedMessage;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.chat.repository.LastCheckedMessageRepository;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

@SpringBootTest
public class ChatTest {

	@Autowired
	UserRepository userRepository;

	@Autowired
	ChatMessageRepository chatMessageRepository;

	@Autowired
	ChatRoomRepository chatRoomRepository;

	@Autowired
	LastCheckedMessageRepository lastCheckedMessageRepository;

	@Test
	@DisplayName("room cascade test")
	void cascadeTest() {
		User host = User.builder().email("host").build();
		User guest = User.builder().email("guest").build();

		userRepository.save(host);
		userRepository.save(guest);

		ChatRoom chatRoom = ChatRoom.builder().host(host).guest(guest).build();

		chatRoomRepository.save(chatRoom);

		ChatMessage chatMessage = ChatMessage.builder().user(host).message("테스트입니다.").build();
		chatMessageRepository.save(chatMessage);

		LastCheckedMessage lastCheckedMessage = LastCheckedMessage.builder()
			.message(chatMessage)
			.room(chatRoom)
			.user(host)
			.build();
		lastCheckedMessageRepository.save(lastCheckedMessage);

		Long lastMessageId = lastCheckedMessage.getId();
		Long chatMessageId = chatMessage.getId();

		chatRoomRepository.deleteById(chatRoom.getId());

		LastCheckedMessage findLastCheckedMessage = lastCheckedMessageRepository.findById(lastMessageId)
			.orElse(null);

		ChatMessage findChatMessage = chatMessageRepository.findById(chatMessageId)
			.orElse(null);

		Assertions.assertThat(chatMessage.getMessage()).isEqualTo("테스트입니다.");
		Assertions.assertThat(findLastCheckedMessage).isNull();
		// Assertions.assertThat(findChatMessage).isNull();
	}
}
