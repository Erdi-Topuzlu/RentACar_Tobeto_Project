package com.tobeto.RentACar.entities.concretes.brand;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.model.Model;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Table(name = "brands")
@Entity
@Data
public class Brand extends BaseEntity {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    private List<Model> models;
}
