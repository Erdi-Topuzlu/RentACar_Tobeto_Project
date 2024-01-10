package com.tobeto.RentACar.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
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
