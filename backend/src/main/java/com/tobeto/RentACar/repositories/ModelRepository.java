package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.model.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelRepository extends JpaRepository<Model, Integer> {
    boolean existsById (int id);

    boolean existsByName(String name);
}
