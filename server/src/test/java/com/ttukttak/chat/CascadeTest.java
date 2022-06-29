package com.ttukttak.chat;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.entity.LastCheckedMessage;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.chat.repository.LastCheckedMessageRepository;
import com.ttukttak.common.config.TestConfig;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(TestConfig.class)
public class CascadeTest {

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

	@Test
	@DisplayName("채팅방 Cascade insert 테스트")
	void cascadeInsertTest() {
		User host = User.builder().email("host").build();
		User guest = User.builder().email("guest").build();

		userRepository.save(host);
		userRepository.save(guest);

		Book book = Book.builder().owner(host).build();
		bookRepository.save(book);

		ChatRoom chatRoom = ChatRoom.builder().book(book).build();

		LastCheckedMessage lastCheckedMessage1 = LastCheckedMessage.builder().user(host).build();
		LastCheckedMessage lastCheckedMessage2 = LastCheckedMessage.builder().user(guest).build();

		chatRoom.addLastCheckedMessage(lastCheckedMessage1);
		chatRoom.addLastCheckedMessage(lastCheckedMessage2);

		chatRoomRepository.save(chatRoom);

		List<LastCheckedMessage> lastCheckedMessages = chatRoom.getLastCheckedMessages();

		// 채팅룸 삭제
		chatRoomRepository.deleteById(chatRoom.getId());

		// lastCheckedMessage도 insert 됐는지 확인
		Assertions.assertThat(lastCheckedMessage1.getId()).isNotNull();
		Assertions.assertThat(lastCheckedMessage2.getId()).isNotNull();

	}

	@Test
	@DisplayName("채팅방 Cascade delete 테스트")
	void cascadeDeleteTest() {
		User user = User.builder().email("user").build();

		userRepository.save(user);

		Book book = Book.builder().owner(user).build();
		bookRepository.save(book);

		ChatRoom chatRoom = ChatRoom.builder().book(book).build();

		LastCheckedMessage lastCheckedMessage = LastCheckedMessage.builder().user(user).build();
		chatRoom.addLastCheckedMessage(lastCheckedMessage);

		chatRoomRepository.save(chatRoom);

		Long messageId = lastCheckedMessage.getId();

		// 채팅룸 삭제
		chatRoomRepository.delete(chatRoom);

		LastCheckedMessage findMessage = lastCheckedMessageRepository.findById(messageId).orElse(null);

		// LastCheckedMessage도 delete 됐는지 확인
		Assertions.assertThat(findMessage).isNull();
	}
}
