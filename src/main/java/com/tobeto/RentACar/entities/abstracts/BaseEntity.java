package com.tobeto.RentACar.entities.abstracts;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
public abstract class BaseEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_date",nullable = false)
    private Timestamp createdDate;

    @Column(name = "updated_date",nullable = true)
    private Timestamp updatedDate;

    @PrePersist
    private void beforeAdd() {
        LocalDateTime now = LocalDateTime.now();
        createdDate = Timestamp.valueOf(now);
    }

    @PreUpdate
    private void beforeUpdate() {
        LocalDateTime now = LocalDateTime.now();
        updatedDate = Timestamp.valueOf(now);

    }
}
