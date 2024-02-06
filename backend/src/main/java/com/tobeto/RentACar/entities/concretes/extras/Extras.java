package com.tobeto.RentACar.entities.concretes.extras;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.rental.Rental;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "extras")
@Data
public class Extras extends BaseEntity {

    @Column(name = "extras_name")
    private String name;

    @OneToMany(mappedBy = "extras")
    @JsonIgnore
    private List<Rental> rentals;

}
