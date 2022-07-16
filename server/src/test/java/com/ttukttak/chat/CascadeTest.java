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
import com.ttukttak.chat.entity.ChatMember;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.repository.ChatMemberRepository;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.common.config.QuerydslConfig;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(QuerydslConfig.class)
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
	ChatMemberRepository chatMemberRepository;

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

		ChatMember chatMember1 = ChatMember.builder().user(host).build();
		ChatMember chatMember2 = ChatMember.builder().user(guest).build();

		chatRoom.addChatMember(chatMember1);
		chatRoom.addChatMember(chatMember2);

		chatRoomRepository.save(chatRoom);

		List<ChatMember> chatMembers = chatRoom.getChatMembers();

		// 채팅룸 삭제
		chatRoomRepository.deleteById(chatRoom.getId());

		// lastCheckedMessage도 insert 됐는지 확인
		Assertions.assertThat(chatMember1.getId()).isNotNull();
		Assertions.assertThat(chatMember2.getId()).isNotNull();

	}

	@Test
	@DisplayName("채팅방 Cascade delete 테스트")
	void cascadeDeleteTest() {
		User user = User.builder().email("user").build();

		userRepository.save(user);

		Book book = Book.builder().owner(user).build();
		bookRepository.save(book);

		ChatRoom chatRoom = ChatRoom.builder().book(book).build();

		ChatMember chatMember = ChatMember.builder().user(user).build();
		chatRoom.addChatMember(chatMember);

		chatRoomRepository.save(chatRoom);

		Long messageId = chatMember.getId();

		// 채팅룸 삭제
		chatRoomRepository.delete(chatRoom);

		ChatMember findMessage = chatMemberRepository.findById(messageId).orElse(null);

		// LastCheckedMessage도 delete 됐는지 확인
		Assertions.assertThat(findMessage).isNull();
	}
}
