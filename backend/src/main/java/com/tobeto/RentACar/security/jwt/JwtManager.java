package com.tobeto.RentACar.security.jwt;

import com.tobeto.RentACar.entities.concretes.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtManager implements JwtService {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    @Value("${jwt.refresh-token.expiration}")
    private Long refreshExpiration;

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public String generateToken(UserDetails userDetails, User user) {
        return generateToken(Map.of(), userDetails, user);
    }

    @Override
    public String generateRefreshToken(UserDetails userDetails, User user) {
        return generateRefreshToken(Map.of(), userDetails, user);
    }

    @Override
    public Boolean isTokenValidate(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);

    }

    public <T> T extractClaim(
            String token,
            Function<Claims,
                    T> claimsResolver) {

        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            User user
    ) {
        return buildToken(extraClaims, userDetails, jwtExpiration, user);
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

}

