package com.ttukttak.address.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ttukttak.address.dto.TownDto;
import com.ttukttak.address.entity.Town;
import com.ttukttak.address.repository.AddressRepository;
import com.ttukttak.address.repository.AddressRepositoryCustom;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AddressServiceImpl implements AddressService {
	private final AddressRepository addressRepository;
	private final AddressRepositoryCustom addressRepositoryCustom;

	@Override
	public List<TownDto> getNearTown(Long townId, double ranged) {
		Town town = addressRepository.getById(townId);

		return addressRepository.getNearTown(town.getLatitude(), town.getLongitude(), ranged)
			.stream()
			.map(c -> new TownDto(c))
			.collect(Collectors.toList());
	}

	/*
	 * JPA에서 Contains, Containing, Like 사용시 에러발생.
	 * 서치 결과 Springboot 최신버전과 Hibernate를 같이 사용시 에러발생
	 * Hibernate버전을 다운그레이드 하거나, @Query를 이용해 직접 쿼리문을 작성.
	 */
	@Override
	public List<TownDto> getSearchTown(String name) {
		return addressRepositoryCustom.findByNameContains(name)
			.stream()
			.map(c -> new TownDto(c))
			.collect(Collectors.toList());
	}

	@Override
	public TownDto getById(Long townId) {
		Town town = addressRepository.getById(townId);
		return new TownDto(town);
	}

}
