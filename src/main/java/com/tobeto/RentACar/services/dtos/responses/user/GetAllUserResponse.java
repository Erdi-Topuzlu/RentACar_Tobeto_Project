package com.tobeto.RentACar.services.dtos.responses.user;

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
    private LocalDate birthDate;
}
