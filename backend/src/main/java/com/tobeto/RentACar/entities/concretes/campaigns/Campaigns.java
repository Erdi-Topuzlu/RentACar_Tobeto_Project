package com.tobeto.RentACar.entities.concretes.campaigns;

import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Table(name = "campaigns")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Campaigns extends BaseEntity {

    @Column(name = "campaigns_title")
    private String title;
    @Column(name = "campaigns_title_desc")
    private String description;
    @Column(name = "campaigns_title_img_path")
    private String imgPath;

}

