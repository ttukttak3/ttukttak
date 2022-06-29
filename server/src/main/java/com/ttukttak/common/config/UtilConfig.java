package com.ttukttak.common.config;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatUser;
import com.ttukttak.chat.entity.ChatRoom;

@Configuration
public class UtilConfig {
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();

		modelMapper.createTypeMap(ChatRoom.class, ChatRoomInfo.class).setConverter(context -> {
			List<ChatUser> members = context.getSource().getLastCheckedMessages()
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
