package com.tobeto.RentACar.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
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

}
