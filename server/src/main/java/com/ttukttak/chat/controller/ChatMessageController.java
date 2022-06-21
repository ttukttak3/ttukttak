package com.ttukttak.chat.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.chat.dto.ChatMessageDto;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.LastCheckedMessageRequest;
import com.ttukttak.chat.service.ChatMessageService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(value = "/messages", description = "채팅메시지 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
public class ChatMessageController {
	private final ChatMessageService chatMessageService;

	@ApiImplicitParam(
		name = "roomId"
		, value = "채팅방 ID"
		, required = true
		, dataType = "long"
		, paramType = "path")
	@ApiOperation(value = "채팅방 전체 메시지 조회")
	@GetMapping("/{roomId}")
	public ResponseEntity<ChatRoomInfo> findAllChats(@PathVariable Long roomId) {
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(chatMessageService.getChatMessages(roomId));
	}

	@ApiImplicitParam(
		name = "chatMessageDto"
		, value = "채팅메시지"
		, required = true
		, dataType = "ChatMessageDto"
		, paramType = "body")
	@ApiOperation(value = "메시지 저장(테스트용)")
	@PostMapping
	public ResponseEntity<ChatMessageDto> insertChat(@RequestBody ChatMessageDto chatMessageDto) {
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(chatMessageService.saveChatMessage(chatMessageDto));
	}

	@ApiImplicitParam(
		name = "LastCheckedMessageRequest"
		, value = "마지막으로 확인한 메시지"
		, required = true
		, dataType = "LastCheckedMessageRequest"
		, paramType = "body")
	@ApiOperation(value = "마지막으로 확인한 메시지 갱신")
	@PutMapping("/lastChecked")
	public ResponseEntity<Boolean> updateLastChecked(@RequestBody LastCheckedMessageRequest request) {
		chatMessageService.updateLastCheckedMessage(request);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(true);
	}
}
