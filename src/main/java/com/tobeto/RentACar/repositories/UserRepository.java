package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
