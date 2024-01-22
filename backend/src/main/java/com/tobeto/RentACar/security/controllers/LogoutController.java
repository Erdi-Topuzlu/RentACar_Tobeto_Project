package com.tobeto.RentACar.security.controllers;

import com.tobeto.RentACar.security.services.LogoutService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/logout")
@Tag(name = "Logout Controller", description = "Logout Endpoints")
@RequiredArgsConstructor
public class LogoutController {

    private final LogoutService logoutService;
    @PostMapping
    public void logout() {
        logoutService.logout();
    }
}
