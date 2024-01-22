package com.tobeto.RentACar.security.services;

import com.tobeto.RentACar.security.services.token.Token;

import java.util.Optional;

public interface TokenService {

    Optional<Token> findByToken(String token);

    Token save(Token token);
}
