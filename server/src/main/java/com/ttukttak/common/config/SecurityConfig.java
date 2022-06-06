package com.ttukttak.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ttukttak.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.ttukttak.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ttukttak.oauth.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ttukttak.oauth.service.CustomOAuth2UserService;
import com.ttukttak.oauth.token.TokenAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity           // Spring Security 활성화
@EnableGlobalMethodSecurity( // SecurityMethod 활성화
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private static final String[] PERMIT_URL_ARRAY = {
            /* auth*/
			"/auth/**", "/oauth2/**",
			/* api */
			"/api/**",
			/* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            /* soket */
            "/ws/**",
            "/topic/**",
            "/app/**"
    };
	
    private final CustomOAuth2UserService customOAuth2UserService;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

    /*
 		HttpCookieOAuth2AuthorizationReqeustRepository
      - JWT를 사용하기 때문에 Session에 저장할 필요가 없어져, Authorization Request를 Based64 encoded cookie에 저장
    */

    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
             		.cors()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
	             // CSRF 비활성화
	                .csrf().disable()
	            // 로그인폼 비활성화
	                .formLogin().disable()
	            // 기본 로그인 창 비활성화
	                .httpBasic().disable()
	                .authorizeRequests()
	                    .antMatchers("/").permitAll()
	                    //.antMatchers("/api/**").hasAnyRole(Role.GUEST.name() ,Role.USER.name(), Role.ADMIN.name())
	                    .antMatchers(PERMIT_URL_ARRAY).permitAll()
	                    .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                    .authorizationEndpoint()
                    .baseUri("/oauth2/authorize")
                    .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                .and()
                    .redirectionEndpoint()
                    .baseUri("/*/oauth2/code/*")
                .and()
                    .userInfoEndpoint()
                    .userService(customOAuth2UserService)
                .and()
                    .successHandler(oAuth2AuthenticationSuccessHandler)
                    .failureHandler(oAuth2AuthenticationFailureHandler);

        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    
}
