package com.tobeto.RentACar.entities.concretes.slider;

import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "slider")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Slider extends BaseEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "img_path")
    private String imgPath;

    private String title;

    private String description;

    private String buttonLabelName;

}
