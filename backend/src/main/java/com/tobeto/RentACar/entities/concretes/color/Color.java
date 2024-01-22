package com.tobeto.RentACar.entities.concretes.color;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.car.Car;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "colors")
@Data

public class Color extends BaseEntity {


    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "color")
    @JsonIgnore
    private List<Car> cars;

}
