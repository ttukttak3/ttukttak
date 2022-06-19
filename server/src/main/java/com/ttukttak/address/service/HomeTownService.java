package com.ttukttak.address.service;

import com.ttukttak.address.entity.HomeTown;
import com.ttukttak.address.entity.Town;
import com.ttukttak.oauth.entity.User;

public interface HomeTownService {
	HomeTown findRangeByUserId(Long id);

	Boolean save(User user, Town town);
}
