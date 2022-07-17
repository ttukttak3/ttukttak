package com.ttukttak.address.dto;

import com.ttukttak.address.entity.Town;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TownDto {
	private Long id;
	private String city;
	private String district;
	private String name;
	private String etc;
	private String address;

	@Builder
	public TownDto(Long id, String city, String district, String name, String etc) {
		this.id = id;
		this.city = city;
		this.district = district;
		this.name = name;
		this.etc = etc;
		this.address = (district + " " + name).trim();
	}

	public static TownDto from(Town town) {
		return TownDto.builder()
			.id(town.getId())
			.city(town.getCity())
			.district(town.getDistrict())
			.name(town.getName())
			.etc(town.getEtc())
			.build();
	}

}
