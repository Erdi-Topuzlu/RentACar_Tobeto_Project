package com.tobeto.RentACar.entities.concretes.contact;

import com.tobeto.RentACar.entities.abstracts.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name= "contact")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Contact extends BaseEntity {

    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "messages" ,columnDefinition = "TEXT")
    private String messages;

}
