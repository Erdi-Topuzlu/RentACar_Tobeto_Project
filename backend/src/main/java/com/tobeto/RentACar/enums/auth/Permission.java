package com.tobeto.RentACar.enums.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Permission {

    // For Admin
    ADMIN_READ("admin:read"),
    ADMIN_CREATE("admin:write"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),

    // For User
    USER_READ("user:read"),
    USER_CREATE("user:write"),
    USER_UPDATE("user:update"),
    USER_DELETE("user:delete")
    ;

     private final String permission;
}
