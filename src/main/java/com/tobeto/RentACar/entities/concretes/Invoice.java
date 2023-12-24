package com.tobeto.RentACar.entities.concretes;


import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Data
public class Invoice extends BaseEntity {


    @ManyToOne
    @JoinColumn(name = "rental_id")
    private Rental rental;


}
