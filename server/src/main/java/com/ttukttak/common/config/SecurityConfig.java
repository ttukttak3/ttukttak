package com.ttukttak.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private static final String[] PERMIT_URL_ARRAY = {
		"*"
	};

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// CSRF 비활성화
			.csrf().disable()
			// 로그인폼 비활성화
			.formLogin().disable()
			// 기본 로그인 창 비활성화
			.httpBasic().disable();

	}

}
