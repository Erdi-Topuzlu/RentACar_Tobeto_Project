package com.tobeto.RentACar.services.dtos.responses.user;

import com.tobeto.RentACar.enums.auth.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdUserResponse {
    private String id;
    private String name;
    private String surname;
    private Double tcNo;
    private String email;
    private String password;
    private Boolean isEnabled;
    private LocalDate birthDate;
    private String userPhotoUrl;
    private Role role;

}
