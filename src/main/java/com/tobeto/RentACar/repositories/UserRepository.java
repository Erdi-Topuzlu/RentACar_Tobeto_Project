package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);

    boolean existsById(int id);
}
