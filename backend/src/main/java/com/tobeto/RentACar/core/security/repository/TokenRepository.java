package com.tobeto.RentACar.core.security.repository;


import com.tobeto.RentACar.core.security.token.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query("select t from Token t inner join Auth u on t.auth.id = u.id where u.id = :authId and (t.expired = false or t.revoked = false)")
    List<Token> findAllValidTokenByAuthId(Integer authId);


    Optional<Token> findByToken(String token);
}
