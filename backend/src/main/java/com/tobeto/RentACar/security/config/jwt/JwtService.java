package com.tobeto.RentACar.security.config.jwt;

import com.tobeto.RentACar.entities.concretes.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    @Value("${jwt.refresh-token.expiration}")
    private Long refreshExpiration;

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);

    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public <T> T extractClaim(
            String token,
            Function<Claims,
                    T> claimsResolver) {

        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails, User user) {
        return generateToken(Map.of(), userDetails, user);
    }

    private String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            User user
    ) {
        return buildToken(extraClaims, userDetails, jwtExpiration, user);
    }

    public String generateRefreshToken(UserDetails userDetails, User user) {
        return generateRefreshToken(Map.of(), userDetails, user);
    }

    private String generateRefreshToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            User user
    ) {
        return buildToken(extraClaims, userDetails, refreshExpiration, user);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            Long expiration,
            User user
    ) {
        return Jwts.builder()
                .claims(extraClaims)
                .claim("id", user.getId())
                .claim("role", user.getRole())
                //.claim("roles", userDetails.getAuthorities())
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean isTokenValidate(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}

