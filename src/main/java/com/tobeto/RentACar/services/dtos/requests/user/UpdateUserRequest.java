package com.tobeto.RentACar.services.dtos.requests.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {

    private int id;
    @NotNull(message = "Name Field Cannot be Empty !")
    private String name;
    @NotNull(message = "Surname Field Cannot be Empty !")
    private String surname;
    @NotNull(message = "E-mail Field Cannot be Empty !")
    @Email(message = "Email is not valid")
    private String email;
    @NotNull(message = "BirthDate Field Cannot be Empty !")
    @DateTimeFormat(pattern="yyyy/MM/gg")
    private LocalDate birthDate;

}
