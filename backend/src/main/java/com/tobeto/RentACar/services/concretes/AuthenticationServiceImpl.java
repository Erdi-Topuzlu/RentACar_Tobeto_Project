package com.tobeto.RentACar.services.concretes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.entities.concretes.confirmation.Confirmation;
import com.tobeto.RentACar.entities.concretes.user.User;
import com.tobeto.RentACar.repositories.ConfirmationRepository;
import com.tobeto.RentACar.repositories.UserRepository;
import com.tobeto.RentACar.rules.user.UserBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.AuthenticationService;
import com.tobeto.RentACar.services.dtos.responses.auth.AuthenticationResponse;
import com.tobeto.RentACar.security.jwt.JwtManager;
import com.tobeto.RentACar.repositories.TokenRepository;
import com.tobeto.RentACar.entities.concretes.token.Token;
import com.tobeto.RentACar.enums.token.TokenType;
import com.tobeto.RentACar.services.abstracts.ConfirmationService;
import com.tobeto.RentACar.services.abstracts.EmailService;
import com.tobeto.RentACar.services.dtos.requests.user.SendEmailUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.ResetPasswordUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.login.LoginUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.register.RegisterUserRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtManager jwtManager;
    private final AuthenticationManager authenticationManager;

    private final UserBusinessRulesService userBusinessRulesService;
    private final ConfirmationService confirmationService;
    private final EmailService emailService;

    @Value("${jwt.bearer}")
    private String bearer;
    private final ConfirmationRepository confirmationRepository;

    @Override
    public AuthenticationResponse register(RegisterUserRequest registerRequest) {
        userBusinessRulesService.checkIfByEmailExists(registerRequest.getEmail());
        var user = User.builder()
                .name(registerRequest.getName())
                .surname(registerRequest.getSurname())
                .email(registerRequest.getEmail())
                .birthDate(registerRequest.getBirthDate())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .isEnabled(false)
                .role(registerRequest.getRole())
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtManager.generateToken(user, user);
        var refreshToken = jwtManager.generateRefreshToken(user, user);
        saveUserToken(savedUser, jwtToken);

        String token = UUID.randomUUID().toString();
        var createdDate = LocalDateTime.now().plusHours(24);

        var confirmation = new Confirmation(user, token, createdDate);
        confirmationService.save(confirmation);

        // Send Email to User with Confirmation Token
        emailService.sendEmailVerification(
                user.getName(),
                user.getEmail(),
                confirmation.getConfirmationToken()
        );

        return AuthenticationResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().toString())
                .isEnabled(savedUser.getIsEnabled())
                .confirmationToken(confirmation.getConfirmationToken())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthenticationResponse login(LoginUserRequest loginUserRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserRequest.getEmail(),
                        loginUserRequest.getPassword()
                )
        );

        var user = userRepository.findByEmail(loginUserRequest.getEmail()).orElseThrow();
        var jwtToken = jwtManager.generateToken(user, user);
        var refreshToken = jwtManager.generateRefreshToken(user, user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        return AuthenticationResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().toString())
                .isEnabled(user.getIsEnabled())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public ResponseEntity<String> verifyConfirmationToken(String confirmationToken) {

        var confirmation = confirmationService.findByConfirmationToken(confirmationToken);
        var user = userRepository.findByEmailIgnoreCase(confirmation.getUser().getEmail());
        user.setIsEnabled(true);
        userRepository.save(user);

        var accountConfirmed = emailService.sendAccountConfirmedEmail(user.getName());

        return ResponseEntity.ok(accountConfirmed);
    }

    @Override
    public void sendForgotPassword(SendEmailUserRequest sendEmailUserRequest) {
        var user = userRepository.findByEmail(sendEmailUserRequest.getEmail()).orElseThrow();
        var confirmation = confirmationRepository.findByUser(user);
        String token = UUID.randomUUID().toString();
        var createdDate = LocalDateTime.now().plusHours(24);

        if (confirmation != null) {
            confirmation.setConfirmationToken(token);
            confirmation.setCreatedDate(createdDate);
            confirmationRepository.save(confirmation);

        } else {
            var existingConfirmation = new Confirmation(user, token, createdDate);
            confirmationRepository.save(existingConfirmation);
        }

        assert confirmation != null;
        emailService.sendForgotPasswordResetEmail(
                user.getName(),
                user.getEmail(),
                confirmation.getConfirmationToken()
        );
    }

    @Override
    public void resetPassword(ResetPasswordUserRequest resetPasswordRequest) {
        var user = userRepository.findByEmail(resetPasswordRequest.getEmail()).orElseThrow();
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void againSendEmailVerification(SendEmailUserRequest sendEmailUserRequest) {
        var user = userRepository.findByEmail(sendEmailUserRequest.getEmail()).orElseThrow();
        var confirmation = confirmationRepository.findByUser(user);
        String token = UUID.randomUUID().toString();
        var createdDate = LocalDateTime.now().plusHours(24);

        if (confirmation != null) {
            confirmation.setConfirmationToken(token);
            confirmation.setCreatedDate(createdDate);
            confirmationRepository.save(confirmation);

        } else {
            var existingConfirmation = new Confirmation(user, token, createdDate);
            confirmationRepository.save(existingConfirmation);
        }

        assert confirmation != null;
        emailService.againSendEmailVerification(
                user.getName(),
                user.getEmail(),
                confirmation.getConfirmationToken()
        );
    }

    @Override
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        refreshAccessToken(request, response);
        return ResponseEntity.ok().build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUserId(user.getId());

        if (validUserTokens.isEmpty()) {
            return;
        }

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(validUserTokens);
    }

    private void refreshAccessToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith(bearer)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, Messages.unAuth);
            return;
        }

        refreshToken = authHeader.substring(7);
        userEmail = jwtManager.extractUsername(refreshToken);

        if (userEmail != null) {
            var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException(Messages.userNotFound));

            if (jwtManager.isTokenValidate(refreshToken, user)) {
                var accessToken = jwtManager.generateToken(user, user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .role(user.getRole().toString())
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();

                response.getWriter().write(new ObjectMapper().writeValueAsString(authResponse));
            }
        }
    }
}