package com.ttukttak.rent.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import com.ttukttak.common.BaseTimeEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Extend extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Long id;

	@ManyToOne
	@JoinColumn(name = "rent")
	private Rent rent;

	private LocalDateTime extendDate;

	@ColumnDefault("7")
	private Integer extendDays;

	public Extend(Long id, Rent rent, LocalDateTime extendDate, Integer extendDays) {
		this.id = id;
		this.rent = rent;
		this.extendDate = extendDate;
		this.extendDays = extendDays;
	}
}

