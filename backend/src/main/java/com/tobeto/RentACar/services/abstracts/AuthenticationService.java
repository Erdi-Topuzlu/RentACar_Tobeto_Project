package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.responses.auth.AuthenticationResponse;
import com.tobeto.RentACar.services.dtos.requests.user.ResetPasswordUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.SendEmailUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.login.LoginUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.register.RegisterUserRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterUserRequest registerRequest);

    AuthenticationResponse login(LoginUserRequest loginUserRequest);

    ResponseEntity<String> verifyConfirmationToken(String confirmationToken);

    void sendForgotPassword(SendEmailUserRequest sendEmailUserRequest);

    void resetPassword(ResetPasswordUserRequest resetPasswordRequest);

    void againSendEmailVerification(SendEmailUserRequest sendEmailUserRequest);


    ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request,
                                                        HttpServletResponse response
    ) throws IOException;


}
