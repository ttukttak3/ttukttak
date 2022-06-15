package com.ttukttak.book.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.ttukttak.chat.entity.ChatRoom;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Book implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book")
	private List<ChatRoom> chatRooms;

	@Builder
	public Book(Long id, User owner) {
		this.id = id;
		this.owner = owner;
	}
}
