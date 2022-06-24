package com.ttukttak.address.dto;

import com.ttukttak.address.entity.HomeTown;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HomeTownDto {
	private Long id;
	private Long userId;
	private TownDto town;
	private Double ranged;
	private UseStatusType useStatus;

	public HomeTownDto(HomeTown homeTown) {
		this.id = homeTown.getId();
		this.userId = homeTown.getUser().getId();
		this.town = new TownDto(homeTown.getTown());
		this.ranged = homeTown.getRanged();
		this.useStatus = homeTown.getUseStatus();
	}
}
