package com.ttukttak.chat.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.chat.dto.ChatRoomCard;
import com.ttukttak.chat.dto.ChatRoomInfo;
import com.ttukttak.chat.dto.ChatRoomRequest;
import com.ttukttak.chat.dto.LastMessage;
import com.ttukttak.chat.entity.ChatMember;
import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.chat.repository.ChatMemberRepository;
import com.ttukttak.chat.repository.ChatMessageRepository;
import com.ttukttak.chat.repository.ChatRoomRepository;
import com.ttukttak.oauth.dto.UserDto;
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
	private final ChatMemberRepository chatMemberRepository;

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
	@Transactional(readOnly = true)
	public List<ChatRoomCard> getRoomList(Long userId) {

		return chatMemberRepository.findAllByUserId(userId).stream().map(member -> {
			ChatRoom room = member.getRoom();

			LastMessage lastMessage = chatMessageRepository.findFirstByChatRoomIdOrderBySendedAtDesc(room.getId())
				.map(chatMessage -> modelMapper.map(chatMessage, LastMessage.class))
				.orElse(null);

			ChatMember anotherMember = room.getChatMembers()
				.stream()
				.filter(m -> m.getId() != member.getId())
				.findFirst()
				.orElse(null);

			LocalDateTime lastCheckedTime;

			if (anotherMember.getLastCheckedMessage() != null) {
				lastCheckedTime = anotherMember.getLastCheckedMessage().getSendedAt();
			} else {
				lastCheckedTime = room.getCreatedDate();
			}

			int unReadCount = chatMessageRepository.countByChatRoomIdAndSendedAtAfterAndMemberIdNot(
				room.getId(), lastCheckedTime, member.getId());

			return ChatRoomCard.builder().roomId(room.getId())
				.another(UserDto.from(anotherMember.getUser()))
				.lastMessage(lastMessage)
				.unread(unReadCount)
				.build();
		}).collect(Collectors.toList());
	}

	/**
	 * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
	 */
	@Override
	@Transactional
	public ChatRoomInfo createChatRoom(ChatRoomRequest request) {
		Book book = bookRepository.findById(request.getBookId())
			.filter(findBook -> !findBook.getIsDelete())
			.orElseThrow(() -> new IllegalArgumentException());

		User host = book.getOwner();
		User guest = userRepository.findById(request.getUserId()).orElseThrow(() -> new IllegalArgumentException());

		if (host.equals(guest)) {
			throw new IllegalArgumentException();
		}

		ChatMember chatMember = chatMemberRepository.findByUserIdAndBookId(guest.getId(), request.getBookId())
			.orElse(null);

		// 이미 존재하는 채팅방이면 채팅방 정보 return
		if (chatMember != null) {
			return ChatRoomInfo.from(chatMember.getRoom());
		}

		ChatRoom chatRoom = ChatRoom.builder()
			.book(book)
			.build();

		ChatMember chatHost = ChatMember.builder().user(host).book(book).build();
		ChatMember chatGuest = ChatMember.builder().user(guest).book(book).build();

		chatRoom.addChatMember(chatHost);
		chatRoom.addChatMember(chatGuest);

		chatRoomRepository.save(chatRoom);

		log.info(chatRoom.getId() + " : 생성");

		opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getId(), chatRoom);

		enterChatRoom(chatRoom.getId());

		return ChatRoomInfo.from(chatRoom);
	}

	/**
	 * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
	 */
	@Override
	public void enterChatRoom(Long roomId) {
		ChannelTopic topic = topics.get(roomId);
		if (topic == null) {
			topic = new ChannelTopic(roomId.toString());
			redisMessageListener.addMessageListener(redisSubscriber, topic);
			topics.put(roomId, topic);
		}
	}

	@Override
	public ChannelTopic getTopic(Long roomId) {
		return topics.get(roomId);
	}
}
