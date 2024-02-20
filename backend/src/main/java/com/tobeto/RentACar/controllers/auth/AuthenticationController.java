package com.tobeto.RentACar.controllers.auth;

import com.tobeto.RentACar.services.concretes.AuthenticationServiceImpl;
import com.tobeto.RentACar.services.dtos.requests.user.SendEmailUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.ResetPasswordUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.login.LoginUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.register.RegisterUserRequest;
import com.tobeto.RentACar.services.dtos.responses.auth.AuthenticationResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication Controller", description = "Authentication Endpoints")
public class AuthenticationController {
    private final AuthenticationServiceImpl authenticationServiceImpl;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterUserRequest request) {
        return ResponseEntity.ok(authenticationServiceImpl.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginUserRequest request) {
        return ResponseEntity.ok(authenticationServiceImpl.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        return authenticationServiceImpl.refreshToken(request, response);
    }

    @PostMapping("/again-send-email-verification")
    public void againSendEmailVerification(@RequestBody SendEmailUserRequest request) {
        authenticationServiceImpl.againSendEmailVerification(request);
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody SendEmailUserRequest request) {
        authenticationServiceImpl.sendForgotPassword(request);
    }

    @PatchMapping("/reset-password")
    public void resetPassword(@RequestBody ResetPasswordUserRequest request) {
        authenticationServiceImpl.resetPassword(request);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<String> confirmAccount(@RequestParam("token") String token) {
        return authenticationServiceImpl.verifyConfirmationToken(token);
    }

}
