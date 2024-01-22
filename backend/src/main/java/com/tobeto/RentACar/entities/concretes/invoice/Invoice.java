package com.tobeto.RentACar.entities.concretes.invoice;


import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.rental.Rental;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "invoices")
@Data
public class Invoice extends BaseEntity {


    @ManyToOne
    @JoinColumn(name = "rental_id")
    private Rental rental;


}
