package com.tobeto.RentACar.security.auth;

import com.tobeto.RentACar.rules.user.UserBusinessRulesService;
import com.tobeto.RentACar.security.services.LogoutService;
import com.tobeto.RentACar.services.dtos.requests.user.UpdateUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.login.LoginUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.register.RegisterUserRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication Controller", description = "Authentication Endpoints")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserBusinessRulesService userBusinessRulesService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterUserRequest request) {
        userBusinessRulesService.checkIfByEmailExists(request.getEmail());
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginUserRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        return authenticationService.refreshToken(request, response);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<String> confirmAccount(@RequestParam("token") String token) {
        Boolean isSuccess = authenticationService.verifyConfirmationToken(token);
        return ResponseEntity.ok("Account confirmed successfully!" + " Success:" + isSuccess);
    }

}
