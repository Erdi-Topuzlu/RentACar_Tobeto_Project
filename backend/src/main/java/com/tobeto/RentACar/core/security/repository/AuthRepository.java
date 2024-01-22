package com.tobeto.RentACar.core.security.repository;


import com.tobeto.RentACar.core.security.user.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Integer> {
    Optional<Auth> findByEmail(String email);
}
