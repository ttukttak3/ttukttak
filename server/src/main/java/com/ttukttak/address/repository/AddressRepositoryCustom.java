package com.ttukttak.address.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ttukttak.address.entity.QTown;
import com.ttukttak.address.entity.Town;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AddressRepositoryCustom {
	private final JPAQueryFactory query;

	public List<Town> findByNameContains(String name) {
		QTown t = new QTown("t");

		return query.selectFrom(t)
			.where(t.name.contains(name))
			.fetch();
	}
}
