package com.tobeto.RentACar.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "colors")
@Getter
@Setter

public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "color_id")
    private int id;

    @Column(name = "color_name")
    private String colorName;

}
