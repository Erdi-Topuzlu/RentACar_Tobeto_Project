package com.tobeto.RentACar.services.dtos.requests.user.register;

import com.tobeto.RentACar.enums.auth.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterUserRequest {


    private String name;
    private String surname;
    private LocalDate birthDate;
    private String email;
    private String password;
    private Boolean isEnabled;
    private Role role;

    public Role getRole() {
        return (role == null) ? Role.USER : role;
    }
}
