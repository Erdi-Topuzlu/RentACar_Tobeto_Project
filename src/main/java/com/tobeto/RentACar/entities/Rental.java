package com.tobeto.RentACar.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Table(name = "Rentals")
@Entity
@Data
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "startDate")
    private Date startDate;

    @Column(name = "endDate")
    private Date endDate;

    @Column(name = "returnDate")
    private Date returnDate;

    @Column(name = "startKilometer")
    private Integer startKilometer;

    @Column(name = "endKilometer")
    private Integer endKilometer;

    @Column(name = "totalPrice")
    private double totalPrice;

}