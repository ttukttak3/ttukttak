package com.ttukttak.chat.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.chat.dto.ChatRoomCard;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatRoomRequest;
import com.ttukttak.chat.dto.ChatUser;
import com.ttukttak.chat.dto.LastMessage;
import com.ttukttak.chat.entity.ChatGuest;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.entity.LastCheckedMessage;
import com.ttukttak.chat.repository.ChatGuestRepository;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.chat.repository.LastCheckedMessageRepository;
import com.ttukttak.common.exception.DuplicatedException;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatRoomServiceImpl implements ChatRoomService {
	private final ModelMapper modelMapper;
	private final ChatRoomRepository chatRoomRepository;
	private final ChatMessageRepository chatMessageRepository;
	private final LastCheckedMessageRepository lastCheckedMessageRepository;

	private final ChatGuestRepository chatGuestRepository;
	private final BookRepository bookRepository;
	private final UserRepository userRepository;

	// 채팅방(topic)에 발행되는 메시지를 처리할 Listner
	private final RedisMessageListenerContainer redisMessageListener;
	// 구독 처리 서비스
	private final RedisSubscriber redisSubscriber;
	// Redis
	private static final String CHAT_ROOMS = "CHAT_ROOM";
	private final RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, Long, ChatRoom> opsHashChatRoom;

	// 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
	private Map<Long, ChannelTopic> topics;

	@PostConstruct
	private void init() {
		opsHashChatRoom = redisTemplate.opsForHash();
		topics = new HashMap<>();
	}

	@Override
	public List<ChatRoomCard> getRoomList(Long userId) {
		return lastCheckedMessageRepository.findAllLastCheckedMessagesByUserId(userId).stream().map(findRoom -> {
			ChatRoom room = findRoom.getRoom();

			LastMessage lastMessage = chatMessageRepository.findFirstByChatRoomIdOrderBySendedAtDesc(room.getId())
				.map(chatMessage -> modelMapper.map(chatMessage, LastMessage.class))
				.orElse(null);

			LastCheckedMessage lastCheckedMessage = lastCheckedMessageRepository.findByRoomIdAndUserId(room.getId(),
				userId).orElseThrow(() -> new IllegalArgumentException());

			LocalDateTime lastCheckedTime;

			if (lastCheckedMessage.getChatMessage() != null) {
				lastCheckedTime = lastCheckedMessage.getChatMessage().getSendedAt();
			} else {
				lastCheckedTime = findRoom.getRoom().getCreatedDate();
			}

			int unReadCount = chatMessageRepository.countByChatRoomIdAndSendedAtAfterAndUserIdNot(
				findRoom.getRoom().getId(), lastCheckedTime, userId);

			return ChatRoomCard.builder().roomId(findRoom.getRoom().getId())
				.other(modelMapper.map(findRoom.getUser(), ChatUser.class))
				.lastMessage(lastMessage)
				.unread(unReadCount)
				.build();
		}).collect(Collectors.toList());
	}

	/**
	 * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
	 */
	@Transactional
	public ChatRoomInfo createChatRoom(ChatRoomRequest request) {
		Book book = bookRepository.findById(request.getBookId())
			.filter(findBook -> findBook.getIsDelete() == Book.DeleteStatus.N)
			.orElseThrow(() -> new IllegalArgumentException());

		User host = book.getOwner();
		User guest = userRepository.findById(request.getUserId()).orElseThrow(() -> new IllegalArgumentException());

		if (host.equals(guest)) {
			throw new IllegalArgumentException();
		}

		boolean isDuplicated = chatGuestRepository.existsByBookIdAndUserId(book.getId(), guest.getId());

		if (isDuplicated) {
			throw new DuplicatedException();
		}

		ChatGuest chatGuest = ChatGuest.builder().book(book).user(guest).build();

		chatGuestRepository.save(chatGuest);

		ChatRoom chatRoom = ChatRoom.builder()
			.book(book)
			.build();

		LastCheckedMessage hostLastCheckedMessage = LastCheckedMessage.builder().user(host).build();
		LastCheckedMessage guestLastCheckedMessage = LastCheckedMessage.builder().user(guest).build();

		chatRoom.addLastCheckedMessage(hostLastCheckedMessage);
		chatRoom.addLastCheckedMessage(guestLastCheckedMessage);

		chatRoomRepository.save(chatRoom);

		log.info(chatRoom.getId() + " : 생성");

		opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getId(), chatRoom);

		enterChatRoom(chatRoom.getId());

		return modelMapper.map(chatRoom, ChatRoomInfo.class);
	}

	/**
	 * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
	 */
	public void enterChatRoom(Long roomId) {
		ChannelTopic topic = topics.get(roomId);
		if (topic == null) {
			topic = new ChannelTopic(roomId.toString());
			redisMessageListener.addMessageListener(redisSubscriber, topic);
			topics.put(roomId, topic);
		}
	}

	public ChannelTopic getTopic(Long roomId) {
		return topics.get(roomId);
	}
}
