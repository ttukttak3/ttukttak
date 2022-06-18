package com.ttukttak.address.dto;

import com.ttukttak.address.entity.Town;

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

	public void setAdress(String city, String district, String name, String etc) {
		this.address = (city + " " + district + " " + name + " " + etc).trim();
	}

	public TownDto(Town town) {
		this.id = town.getId();
		this.city = town.getCity();
		this.district = town.getDistrict();
		this.name = town.getName();
		this.etc = town.getEtc();
		this.address = (town.getCity() + " " + town.getDistrict() + " " + town.getName() + " " + town.getEtc()).trim();
	}

	public Town toEntity() {
		return Town.builder()
			.id(id)
			.city(city)
			.district(district)
			.name(name)
			.etc(etc)
			.build();

	}

}
