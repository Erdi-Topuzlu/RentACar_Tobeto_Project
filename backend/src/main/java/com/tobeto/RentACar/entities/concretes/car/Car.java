package com.tobeto.RentACar.entities.concretes.car;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.*;
import com.tobeto.RentACar.entities.concretes.carImage.CarImage;
import com.tobeto.RentACar.entities.concretes.color.Color;
import com.tobeto.RentACar.entities.concretes.model.Model;
import com.tobeto.RentACar.entities.concretes.rental.Rental;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "cars")
@Data
public class Car extends BaseEntity {


    @Column(name = "kilometer")
    private int kilometer;

    @Column(name = "plate")
    private String plate;

    @Column(name = "year")
    private int year;

    @Column(name = "daily_price")
    private double dailyPrice;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    @OneToMany(mappedBy = "car")
    @JsonIgnore
    private List<Rental> rentals;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @OneToMany(mappedBy = "car")
    @JsonIgnore
    private List<CarImage> carImages;

    @Enumerated(EnumType.STRING)
    @Column(name = "gear_type")
    private GearType gearType;

    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type")
    private FuelType fuelType;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_type")
    private VehicleType vehicleType;

    @Enumerated(EnumType.STRING)
    @Column(name = "seat_type")
    private SeatType seatType;

}
