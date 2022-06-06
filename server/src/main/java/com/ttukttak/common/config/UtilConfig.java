package com.ttukttak.common.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UtilConfig {

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
