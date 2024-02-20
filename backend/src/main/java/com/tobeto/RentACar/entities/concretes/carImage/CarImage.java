package com.tobeto.RentACar.entities.concretes.carImage;

import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.car.Car;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "car_images")
@Data
public class CarImage {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_sequence")
    @SequenceGenerator(name = "my_sequence", sequenceName = "my_sequence", allocationSize = 1, initialValue = 10000)
    private int id;

    @Column(name = "img_path")
    private String imgPath;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

}
