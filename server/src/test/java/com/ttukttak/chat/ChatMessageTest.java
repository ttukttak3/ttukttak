package com.ttukttak.chat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.MessageType;
import com.ttukttak.chat.entity.ChatMessage;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.common.config.TestConfig;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(TestConfig.class)
public class ChatMessageTest {
	@Autowired
	ChatMessageRepository chatMessageRepository;

	@Test
	@DisplayName("ChatMessage.of 테스트")
	void ofTest() {
		ChatMessageDto chatMessageDto = new ChatMessageDto();
		chatMessageDto.setMessage("test");
		chatMessageDto.setMessageType(MessageType.TEXT);
		chatMessageDto.setRoomId(1L);
		chatMessageDto.setUserId(1L);

		chatMessageRepository.save(ChatMessage.of(chatMessageDto));
	}
}
