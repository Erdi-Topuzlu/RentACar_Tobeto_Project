package com.tobeto.RentACar.services.dtos.responses.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tobeto.RentACar.entities.concretes.rental.Rental;
import com.tobeto.RentACar.security.entities.Role;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllUserResponse {
    private int id;
    private String name;
    private String surname;
    private String email;
    private Boolean isEnabled;
    private String password;
    private Double tcNo;
    private Role role;

    //@JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthDate;
    private String userPhotoUrl;

}
