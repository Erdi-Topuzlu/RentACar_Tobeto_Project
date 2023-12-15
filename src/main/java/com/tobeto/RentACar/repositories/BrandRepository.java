package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
    boolean existsById(int id);
}
