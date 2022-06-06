package com.ttukttak.oauth.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    GUEST("ROLE_GUEST", "손님"), // 추가 입력 X
    USER("ROLE_USER", "일반 사용자"), // 추가 입력 O
    ADMIN("ROLE_ADMIN", "관리자");

    private final String key;
    private final String title;
}
