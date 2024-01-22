package com.tobeto.RentACar.entities.concretes.carImage;

import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.car.Car;
import jakarta.persistence.*;
import lombok.Data;

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
