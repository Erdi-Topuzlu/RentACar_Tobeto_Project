package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.Slider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SliderRepository extends JpaRepository<Slider, Integer> {

    boolean existsById(int id);

}
