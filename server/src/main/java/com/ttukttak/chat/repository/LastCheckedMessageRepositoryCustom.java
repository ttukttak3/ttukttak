package com.ttukttak.chat.repository;

import java.util.List;

import com.ttukttak.chat.entity.LastCheckedMessage;

public interface LastCheckedMessageRepositoryCustom {
	List<LastCheckedMessage> findAllLastCheckedMessagesByUserId(Long userId);
}
