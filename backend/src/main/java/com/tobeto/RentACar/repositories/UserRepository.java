package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);


    boolean existsById(int id);
}
