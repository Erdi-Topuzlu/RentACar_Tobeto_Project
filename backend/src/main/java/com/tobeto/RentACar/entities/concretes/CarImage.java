package com.tobeto.RentACar.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "car_images")
@Data
public class CarImage extends BaseEntity {
    @Column(name = "img_path")
    private String imgPath;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

}
