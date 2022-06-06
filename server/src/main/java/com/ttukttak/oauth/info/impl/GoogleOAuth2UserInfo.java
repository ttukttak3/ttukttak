package com.ttukttak.oauth.info.impl;

import java.util.Map;

import com.ttukttak.oauth.info.OAuth2UserInfo;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }

	@Override
	public String getAge() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getGender() {
		// TODO Auto-generated method stub
		return null;
	}
}
