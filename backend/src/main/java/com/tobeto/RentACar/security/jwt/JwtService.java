package com.tobeto.RentACar.security.jwt;

import com.tobeto.RentACar.entities.concretes.user.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String extractUsername(String token);
    String generateToken(UserDetails userDetails, User user);
    String generateRefreshToken(UserDetails userDetails, User user);
    Boolean isTokenValidate(String token, UserDetails userDetails);
}
