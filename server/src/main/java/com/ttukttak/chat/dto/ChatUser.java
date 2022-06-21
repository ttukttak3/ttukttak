package com.ttukttak.chat.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatUser implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String imageUrl;
}
