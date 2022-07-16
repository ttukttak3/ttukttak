package com.ttukttak.common.config;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatUser;
import com.ttukttak.chat.entity.ChatRoom;

@Configuration
public class UtilConfig {
	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JavaTimeModule());
		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

		return mapper;
	}

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();

		modelMapper.createTypeMap(ChatRoom.class, ChatRoomInfo.class).setConverter(context -> {
			List<ChatUser> members = context.getSource().getChatMembers()
				.stream()
				.map(v -> modelMapper.map(v.getUser(), ChatUser.class))
				.collect(
					Collectors.toList());

			List<ChatMessageDto> messages = context.getSource().getMessages()
				.stream()
				.map(v -> modelMapper.map(v, ChatMessageDto.class))
				.collect(
					Collectors.toList());
			return ChatRoomInfo.builder()
				.roomId(context.getSource().getId())
				.messages(messages)
				.members(members)
				.build();
		});

		return modelMapper;
	}
}
