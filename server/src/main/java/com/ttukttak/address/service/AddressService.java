package com.ttukttak.address.service;

import java.util.List;

import com.ttukttak.address.dto.TownDto;

public interface AddressService {

	List<TownDto> getNearTown(Long townId, double ranged);

	List<TownDto> getSearchTown(String name);

	TownDto getById(Long townId);

}
