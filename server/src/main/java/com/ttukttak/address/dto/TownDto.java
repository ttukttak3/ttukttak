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

	public String getAdress() {
		return (city + " " + district + " " + name + " " + etc).trim();
	}

	public TownDto(Town town) {
		this.id = town.getId();
		this.city = town.getCity();
		this.district = town.getDistrict();
		this.name = town.getName();
		this.etc = town.getEtc();
	}

}
