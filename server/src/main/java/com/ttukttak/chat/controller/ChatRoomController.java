package com.ttukttak.chat.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

	private final ChatRoomService chatRoomService;

	// 모든 채팅방 목록 반환
	@GetMapping("/rooms/{userId}")
	@ResponseBody
	public ResponseEntity<List<ChatRoomCard>> getRooms(@PathVariable Long userId) {
		List<ChatRoomCard> chatRooms = chatRoomService.getRoomList(userId);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(chatRooms);
	}

	// 채팅방 생성
	@PostMapping("/room")
	@ResponseBody
	public ResponseEntity<ChatRoomInfo> createRoom(@RequestBody ChatRoomRequest request) {
		ChatRoomInfo chatRoomInfo = chatRoomService.createChatRoom(request);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(chatRoomInfo);
	}

}
