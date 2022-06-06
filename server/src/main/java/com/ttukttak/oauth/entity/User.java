package com.ttukttak.oauth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String imageUrl;

    @NotNull
    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;
    
    @Column
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    private String providerId;
    
    @Column
    private String gender;
    
    @Column
    private String age;

    @Builder
    public User(String name, String email, String imageUrl,Role role, AuthProvider provider, String providerId, String gender, String age) {
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.role = role;
        this.provider = provider;
        this.providerId = providerId;
        this.gender = gender;
        this.age = age;
    }

}

