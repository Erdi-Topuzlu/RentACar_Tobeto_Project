package com.tobeto.RentACar.services.dtos.requests.user;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {

    private int id;
    @NotBlank(message = Messages.userNameNotEmpty)
    private String name;

    @NotBlank(message = Messages.userSurnameNotEmpty)
    private String surname;

    @NotBlank(message = Messages.userEmailNotEmpty)
    @Email(message = Messages.invalidEmail)
    private String email;

    //@NotNull(message = Messages.userBirthDateNotEmpty)
    private LocalDate birthDate;

}
