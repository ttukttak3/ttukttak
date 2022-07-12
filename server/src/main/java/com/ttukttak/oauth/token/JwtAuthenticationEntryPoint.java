package com.ttukttak.oauth.token;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttukttak.common.dto.StatusMessage;
import com.ttukttak.common.exception.ExceptionFactory;
import com.ttukttak.common.exception.StatusCode;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Autowired
	private ObjectMapper mapper;

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException {

		StatusCode statusCode = ExceptionFactory.getInstance(authException);
		StatusMessage message = new StatusMessage(statusCode);

		response.setContentType("application/json;charset=UTF-8");
		response.setStatus(statusCode.getHttpStatus().value());
		response.getWriter().println(mapper.writeValueAsString(message));
	}
}