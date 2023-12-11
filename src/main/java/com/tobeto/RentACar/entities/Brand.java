package com.tobeto.RentACar.entities;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "Brands")
@Entity
@Data
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;
}
