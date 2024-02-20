package com.tobeto.RentACar.services.dtos.responses.user;

import com.tobeto.RentACar.enums.auth.Role;
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
