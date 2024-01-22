package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.brand.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
    boolean existsByName(String name);

    boolean existsById (int id);
}
