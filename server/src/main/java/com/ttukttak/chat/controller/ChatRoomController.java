package com.ttukttak.chat.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ttukttak.chat.dto.ChatRoomCard;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatRoomRequest;
import com.ttukttak.chat.service.ChatRoomService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(value = "/api/v1", description = "채팅방 API")
@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1")
public class ChatRoomController {

	private final ChatRoomService chatRoomService;

	@ApiImplicitParam(
		name = "userId"
		, value = "유저 ID"
		, required = true
		, dataType = "long"
		, paramType = "path")
	@ApiOperation(value = "모든 채팅방 목록 조회")
	@GetMapping("/users/{userId}/chat/rooms")
	@ResponseBody
	public ResponseEntity<List<ChatRoomCard>> getRooms(@PathVariable Long userId) {
		//TODO: 로그인한 유저인지 확인?
		return ResponseEntity.ok(chatRoomService.getRoomList(userId));
	}

	@ApiImplicitParam(
		name = "ChatRoomRequest"
		, value = "채팅방 생성 Request"
		, required = true
		, dataType = "object"
		, paramType = "body")
	@ApiOperation(value = "채팅방 생성")
	@PostMapping("/chat/rooms")
	@ResponseBody
	public ResponseEntity<ChatRoomInfo> createRoom(@RequestBody ChatRoomRequest chatRoomRequest) {

		return ResponseEntity.ok(chatRoomService.createChatRoom(chatRoomRequest));
	}

}
