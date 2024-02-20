package com.tobeto.RentACar.entities.concretes.campaigns;

import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import com.tobeto.RentACar.entities.concretes.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;


@Table(name = "campaigns")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Campaigns extends BaseEntity {

    @Column(name = "campaigns_title")
    private String title;

    @Column(name = "campaigns_title_desc", columnDefinition = "TEXT")
    private String description;

    @Column(name = "campaigns_title_img_path")
    private String imgPath;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @PrePersist
    private void beforeAdd() {
        LocalDate now = LocalDate.now();
        createdDate = Date.valueOf(now).toLocalDate();
    }

}

