package com.tobeto.RentACar.security.entities;

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

    // For Manager
    MANAGER_READ("management:read"),
    MANAGER_CREATE("management:write"),
    MANAGER_UPDATE("management:update"),
    MANAGER_DELETE("management:delete"),

    // For User
    USER_READ("user:read"),
    USER_CREATE("user:write"),
    USER_UPDATE("user:update"),
    USER_DELETE("user:delete")
    ;

     private final String permission;
}
