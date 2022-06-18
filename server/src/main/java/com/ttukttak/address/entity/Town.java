package com.ttukttak.address.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Town {
	@Id
	private Long id;

	@Column(length = 10)
	private String city;

	@Column(length = 20)
	private String district;

	@Column(length = 10)
	private String name;

	@Column(length = 10)
	private String etc;

	private Double latitude;

	private Double longitude;

	@Builder
	public Town(Long id, String city, String district, String name, String etc, Double latitude, Double longitude) {
		this.id = id;
		this.city = city;
		this.district = district;
		this.name = name;
		this.etc = etc;
		this.latitude = latitude;
		this.longitude = longitude;
	}

}
