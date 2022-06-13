package com.ttukttak.chat.service;

import java.util.List;

import org.springframework.data.redis.listener.ChannelTopic;

import com.ttukttak.chat.dto.ChatRoomCard;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatRoomRequest;

public interface ChatRoomService {
	List<ChatRoomCard> getRoomList(Long userId);

	ChatRoomInfo findRoomById(Long id);

	/**
	 * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
	 */
	ChatRoomInfo createChatRoom(ChatRoomRequest request);

	/**
	 * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
	 */
	void enterChatRoom(Long roomId);

	ChannelTopic getTopic(Long roomId);
}
