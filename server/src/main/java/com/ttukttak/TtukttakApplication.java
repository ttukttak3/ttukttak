package com.ttukttak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.ttukttak.common.config.AppProperties;

@EnableJpaAuditing
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class TtukttakApplication {

	public static void main(String[] args) {
		SpringApplication.run(TtukttakApplication.class, args);
	}

}
