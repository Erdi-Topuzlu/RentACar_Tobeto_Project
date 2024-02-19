package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.entities.concretes.token.Token;

import java.util.Optional;

public interface TokenService {

    Optional<Token> findByToken(String token);

    Token save(Token token);
}
