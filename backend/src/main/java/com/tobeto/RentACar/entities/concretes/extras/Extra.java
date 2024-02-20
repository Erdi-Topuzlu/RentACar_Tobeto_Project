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
@Table(name = "extra")
@Data
public class Extra extends BaseEntity {

    @Column(name = "extra_name")
    private String extraName;

    @Column(name = "extra_price")
    private int extraPrice;

    @OneToMany(mappedBy = "extra")
    @JsonIgnore
    private List<Rental> rentals;

}
