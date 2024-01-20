package com.tobeto.RentACar.services.dtos.requests.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginUserRequest {
    private String username;
    private String password;
}
