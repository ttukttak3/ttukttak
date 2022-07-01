package com.ttukttak.address.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ttukttak.address.entity.HomeTown;
import com.ttukttak.address.entity.HomeTown.UseStatusType;
import com.ttukttak.address.entity.Town;
import com.ttukttak.address.repository.HomeTownRepository;
import com.ttukttak.oauth.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HomeTownServiceImpl implements HomeTownService {

	private final HomeTownRepository homeTownRepository;

	@Override
	public HomeTown findRangeByUserId(Long id) {
		return homeTownRepository.getByUserId(id);
	}

	@Override
	@Transactional
	public Boolean save(User user, Town town) {
		HomeTown homeTown = homeTownRepository.getByUserId(user.getId());

		Long homeTownId = null;

		if (homeTown != null) {
			homeTownId = homeTown.getId();
		}

		homeTownRepository.save(HomeTown.builder()
			.id(homeTownId)
			.user(user)
			.town(town)
			.useStatusType(UseStatusType.Y)
			.build());
		return true;
	}
}
