package com.ttukttak.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AWSConfig {

	@Value("${cloud.aws.credentials.access-key}")
	private String accessKey;

	@Value("${cloud.aws.credentials.secret-key}")
	private String secretKey;

	@Bean
	public AmazonS3 amazonS3Client() {
		return AmazonS3ClientBuilder.standard()
			.withEndpointConfiguration(
				new AwsClientBuilder.EndpointConfiguration("https://kr.object.ncloudstorage.com", "kr-standard"))
			.withCredentials(new AWSStaticCredentialsProvider(
				new BasicAWSCredentials(accessKey, secretKey)))
			.build();
	}
}
