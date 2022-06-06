package com.ttukttak.common.exception;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationProcessingException extends AuthenticationException {

    public OAuth2AuthenticationProcessingException(String msg, Throwable t) throws UnsupportedEncodingException {
        super(URLEncoder.encode(msg,"UTF-8"), t);
    }

    public OAuth2AuthenticationProcessingException(String msg) throws UnsupportedEncodingException {
        super(URLEncoder.encode(msg,"UTF-8"));
    }
}
