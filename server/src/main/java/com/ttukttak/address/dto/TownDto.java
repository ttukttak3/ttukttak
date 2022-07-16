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

	//반환값 지역구 + 동
	public String getAddress() {
		return (district + " " + name).trim();
	}

	//반환값 시 + 구 + 동 + 외
	public String getFullAddress() {
		return (city + " " + district + " " + name + " " + etc).trim();
	}

	@Builder
	public TownDto(Long id, String city, String district, String name, String etc) {
		super();
		this.id = id;
		this.city = city;
		this.district = district;
		this.name = name;
		this.etc = etc;
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
