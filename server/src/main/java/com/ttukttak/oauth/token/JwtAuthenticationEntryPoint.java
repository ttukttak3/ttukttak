package com.ttukttak.oauth.token;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException {

		/*
		 *  Exception Handler로 처리하고 싶지만 좀더 파악해야함!(임시방편)
		 *  Security에서 허용하지 않는 URL에 대한 토큰이 인증되지 않으면 수행
		 */

		response.setContentType("application/json;charset=UTF-8");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.getWriter().println("{ \"message\" : \"Not authorized"
			+ "\", \"code\" : \"C-3\"}");

	}
}
