package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelRepository extends JpaRepository<Model, Integer> {
    boolean existsById (int id);
}
