package com.tobeto.RentACar.entities;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "Models")
@Data
@Entity
public class Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

}
