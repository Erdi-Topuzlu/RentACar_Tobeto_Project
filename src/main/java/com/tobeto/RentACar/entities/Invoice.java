package com.tobeto.RentACar.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "invoices")
@Getter
@Setter
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private int id;

    @Column(name = "invoice_create_date")
    private int createDate;


}
