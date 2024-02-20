package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.services.concretes.LogoutManager;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/logout")
@Tag(name = "Logout Controller", description = "Logout Endpoints")
@RequiredArgsConstructor
public class LogoutController {

    private final LogoutManager logoutManager;

    @PostMapping
    public ResponseEntity<String> logout() {
        logoutManager.logout();
        return ResponseEntity.ok(Messages.logoutSuccess);
    }
}
