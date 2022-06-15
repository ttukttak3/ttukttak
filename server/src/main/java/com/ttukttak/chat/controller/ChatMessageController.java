package com.ttukttak.chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.service.ChatMessageService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/message")
public class ChatMessageController {
	private final ChatMessageService chatMessageService;

	@GetMapping("/{roomId}")
	public List<ChatMessageDto> findAllChats(@PathVariable Long roomId) {
		return chatMessageService.getChatMessages(roomId);
	}
}
