package com.ttukttak.address.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ttukttak.common.BaseTimeEntity;
import com.ttukttak.oauth.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class HomeTown extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "town_id")
	private Town town;

	private Double ranged = 3.0;

	@Enumerated(EnumType.STRING)
	@ColumnDefault("'Y'")
	private UseStatusType useStatus;

	@Builder
	public HomeTown(Long id, User user, Town town, UseStatusType useStatusType) {
		this.id = id;
		this.user = user;
		this.town = town;
		this.useStatus = useStatusType;
	}

	public enum UseStatusType {
		Y, N
	}
}