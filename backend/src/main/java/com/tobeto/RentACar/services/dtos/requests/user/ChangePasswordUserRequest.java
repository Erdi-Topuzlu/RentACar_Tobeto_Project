package com.tobeto.RentACar.services.dtos.requests.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangePasswordUserRequest {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}
