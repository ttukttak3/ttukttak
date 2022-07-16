package com.ttukttak.chat.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.LastCheckedMessageRequest;
import com.ttukttak.chat.service.ChatMessageService;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.UserPrincipal;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "/api/v1/chat/messages", description = "채팅메시지 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chat/messages")
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
	public ResponseEntity<ChatRoomInfo> findAllChats(
		@ApiIgnore
		@CurrentUser
			UserPrincipal userPrincipal, @PathVariable Long roomId) {
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(chatMessageService.getChatMessages(roomId, userPrincipal.getId()));
	}

	@ApiImplicitParam(
		name = "LastCheckedMessageRequest"
		, value = "마지막으로 확인한 메시지"
		, required = true
		, dataType = "LastCheckedMessageRequest"
		, paramType = "body")
	@ApiOperation(value = "마지막으로 확인한 메시지 갱신")
	@PatchMapping("/last-checked")
	public ResponseEntity<Boolean> updateLastCheckedMessage(@RequestBody LastCheckedMessageRequest request) {
		chatMessageService.updateLastCheckedMessage(request);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(true);
	}

	@ApiOperation(value = "채팅방 나가기")
	@DeleteMapping("/last-checked/{lastCheckedMessageId}")
	public ResponseEntity<Boolean> removeLastCheckedMessage(
		@ApiIgnore
		@CurrentUser
			UserPrincipal userPrincipal, @PathVariable Long lastCheckedMessageId) {

		chatMessageService.removeLastCheckedMessageById(lastCheckedMessageId, userPrincipal.getId());
		
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(true);
	}
}
