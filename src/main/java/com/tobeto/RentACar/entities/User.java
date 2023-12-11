package com.tobeto.RentACar.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Table(name = "Users")
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "datetime")
    private LocalDate BirthDate;

}
