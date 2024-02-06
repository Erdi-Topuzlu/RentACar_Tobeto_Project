package com.tobeto.RentACar.entities.concretes.rental;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.extras.Extra;
import com.tobeto.RentACar.entities.concretes.user.User;
import com.tobeto.RentACar.entities.concretes.car.Car;
import com.tobeto.RentACar.entities.concretes.invoice.Invoice;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Table(name = "rentals")
@Entity
@Data
public class Rental extends BaseEntity {


    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "start_kilometer")
    private int startKilometer;

    @Column(name = "end_kilometer")
    private Integer endKilometer;

    @Column(name = "total_price")
    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @ManyToOne
    @JoinColumn(name = "extra_id")
    private Extra extra;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "rental")
    @JsonIgnore
    private List<Invoice> invoices;

}