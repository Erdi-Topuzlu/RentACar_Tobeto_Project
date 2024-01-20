package com.tobeto.RentACar.services.dtos.requests.user;
import com.tobeto.RentACar.entities.concretes.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserRequest {

    private String email;
    private String password;
    private String username;
    private List<Role> roles;


}
