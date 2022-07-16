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

@Api(value = "/api/v1", description = "채팅메시지 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class ChatMessageController {
	private final ChatMessageService chatMessageService;

	@ApiImplicitParam(
		name = "roomId"
		, value = "채팅방 ID"
		, required = true
		, dataType = "long"
		, paramType = "path")
	@ApiOperation(value = "채팅방 전체 메시지 조회")
	@GetMapping("/chat/rooms/{roomId}/messages")
	public ResponseEntity<ChatRoomInfo> findAllChats(
		@ApiIgnore
		@CurrentUser
			UserPrincipal userPrincipal, @PathVariable Long roomId) {

		return ResponseEntity.ok(chatMessageService.getChatMessages(roomId, userPrincipal.getId()));
	}

	@ApiImplicitParam(
		name = "LastCheckedMessageRequest"
		, value = "마지막으로 확인한 메시지"
		, required = true
		, dataType = "LastCheckedMessageRequest"
		, paramType = "body")
	@ApiOperation(value = "마지막으로 확인한 메시지 갱신")
	@PatchMapping("/chat/members/{roomId}/last-checked")
	public ResponseEntity<Boolean> updateLastCheckedMessage(
		@ApiIgnore
		@CurrentUser
			UserPrincipal userPrincipal,
		@PathVariable
			Long roomId,
		@RequestBody LastCheckedMessageRequest request) {
		chatMessageService.updateLastCheckedMessage(request, userPrincipal.getId());

		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@ApiOperation(value = "채팅방 나가기")
	@DeleteMapping("/chat/members/{roomId}")
	public ResponseEntity<Boolean> removeChatMember(
		@ApiIgnore
		@CurrentUser
			UserPrincipal userPrincipal, @PathVariable Long roomId) {

		chatMessageService.removeChatMember(roomId, userPrincipal.getId());

		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
