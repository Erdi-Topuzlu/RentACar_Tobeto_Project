package com.tobeto.RentACar.services.dtos.requests.user;

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
public class AddUserRequest {
    @NotNull(message = "Name Field Cannot be Empty !")
    @NotBlank(message = "Name Field Cannot be Empty !")
    private String name;
    @NotBlank(message = "Surname Field Cannot be Empty !")
    private String surname;
    @NotBlank(message = "E-mail Field Cannot be Empty !")
    @Email(message = "Email is not valid")
    private String email;
    @NotNull(message = "BirthDate Field Cannot be Empty !")
    private LocalDate birthDate;

}
