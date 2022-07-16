package com.ttukttak.rent.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

import com.ttukttak.common.BaseTimeEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Extend extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "rent")
	private Rent rent;

	private LocalDate extendDate;

	@NotNull
	@ColumnDefault("7")
	private int extendDays;

	@Builder
	public Extend(Long id, Rent rent, int extendDays) {
		this.id = id;
		this.rent = rent;
		this.extendDate = rent.getEndDate();
		this.extendDays = extendDays;
	}
}

