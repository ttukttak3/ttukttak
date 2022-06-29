package com.ttukttak.common.config;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import com.querydsl.jpa.impl.JPAQueryFactory;

@TestConfiguration
public class TestConfig {

	@PersistenceContext
	private EntityManager entityManager;

	@Bean("testJpaQueryFactory")
	public JPAQueryFactory jpaQueryFactory() {
		return new JPAQueryFactory(entityManager);
	}
}
