package com.ttukttak.oauth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.common.exception.ResourceNotFoundException;
import com.ttukttak.oauth.entity.CurrentUser;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.entity.UserPrincipal;
import com.ttukttak.oauth.repository.UserRepository;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
