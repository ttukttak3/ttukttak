package com.ttukttak.chat.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoom extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	//TODO: 책 구현되면 my_book_id 사용
	// Book book
	// @OneToOne
	// @JoinColumn(name = "my_book_id")
	// private MyBook message;

	@OneToOne
	@JoinColumn(name = "host_id")
	private User host;

	@OneToOne
	@JoinColumn(name = "guest_id")
	private User guest;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "chatRoom", orphanRemoval = true)
	private List<ChatMessage> messages;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "room", orphanRemoval = true)
	private List<LastCheckedMessage> lastCheckedMessage;

	@Builder
	public ChatRoom(Long id, User host, User guest) {
		this.id = id;
		this.host = host;
		this.guest = guest;
	}
}
