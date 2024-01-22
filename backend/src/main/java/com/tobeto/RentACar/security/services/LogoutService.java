package com.tobeto.RentACar.security.services;

import com.tobeto.RentACar.security.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenService tokenService;
    private final HttpServletRequest request;
    private final HttpServletResponse response;
    private  Authentication authentication;

    @Value("${jwt.bearer}")
    private String bearer;

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith(bearer)) {
            return;
        }

        String jwtToken = authHeader.substring(7);

        var storedToken = tokenService.findByToken(jwtToken).orElseThrow(() -> new RuntimeException("Token not found"));
        if (storedToken != null) {
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            tokenService.save(storedToken);
        }
    }

    public void logout() {
        logout(request, response, authentication);
    }
}
