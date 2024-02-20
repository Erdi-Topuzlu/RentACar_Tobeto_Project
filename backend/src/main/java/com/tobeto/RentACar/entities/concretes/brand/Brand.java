package com.tobeto.RentACar.entities.concretes.brand;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.model.Model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "brands")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Brand extends BaseEntity {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    private List<Model> models;

}
