package com.tobeto.RentACar.entities.concretes.extras;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.rental.Rental;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "extra")
@Data
public class Extra {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Nullable
    private Integer id;

    @Column(name = "extra_price")
    private int extraPrice;

    @OneToMany(mappedBy = "extra")
    @JsonIgnore
    private List<Rental> rentals;

}
