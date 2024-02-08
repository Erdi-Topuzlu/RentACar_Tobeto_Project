package com.tobeto.RentACar.services.dtos.requests.user.register;

import com.tobeto.RentACar.security.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterUserRequest {

    private String email;
    private String name;
    private String surname;
    private String password;
    private Role role;

    public Role getRole() {
        return (role == null) ? Role.USER : role;
    }
}
