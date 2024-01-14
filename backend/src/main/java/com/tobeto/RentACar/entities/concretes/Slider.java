package com.tobeto.RentACar.entities.concretes;

import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "slider")
@Entity
@Data
public class Slider extends BaseEntity {

    @Column(name = "img_path")
    private String imgPath;


}
