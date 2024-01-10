package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color, Integer> {
    boolean existsById (int id);
    boolean existsByName (String name);
}
