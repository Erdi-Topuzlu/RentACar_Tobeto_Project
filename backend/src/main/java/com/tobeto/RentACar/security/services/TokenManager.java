package com.tobeto.RentACar.security.services;

import com.tobeto.RentACar.security.services.token.Token;
import com.tobeto.RentACar.security.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenManager implements TokenService {

    private final TokenRepository tokenRepository;


    @Override
    public Optional<Token> findByToken(String token) {

        return tokenRepository.findByToken(token);
    }

    @Override
    public Token save(Token token) {
        return tokenRepository.save(token);
    }
}
