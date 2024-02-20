package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.entities.concretes.token.Token;
import com.tobeto.RentACar.repositories.TokenRepository;
import com.tobeto.RentACar.services.abstracts.TokenService;
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
