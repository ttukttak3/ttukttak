package com.ttukttak.address.dto;

import com.ttukttak.address.entity.HomeTown;
import com.ttukttak.address.entity.HomeTown.UseStatusType;

import lombok.Builder;
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

	@Builder
	public HomeTownDto(Long id, Long userId, TownDto town, Double ranged, UseStatusType useStatus) {
		super();
		this.id = id;
		this.userId = userId;
		this.town = town;
		this.ranged = ranged;
		this.useStatus = useStatus;
	}

	public static HomeTownDto from(HomeTown homeTown) {
		return HomeTownDto.builder()
			.id(homeTown.getId())
			.userId(homeTown.getUser().getId())
			.town(TownDto.from(homeTown.getTown()))
			.ranged(homeTown.getRanged())
			.useStatus(homeTown.getUseStatus())
			.build();
	}
}
