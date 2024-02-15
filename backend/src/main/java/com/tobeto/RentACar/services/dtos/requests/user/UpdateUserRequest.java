package com.tobeto.RentACar.services.dtos.requests.user;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.security.entities.Role;
import jakarta.validation.constraints.NotBlank;
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

    private Double tcNo;

    /*@NotBlank(message = Messages.userEmailNotEmpty)
    @Email(message = Messages.invalidEmail)*/
    private String email;

    private String password;

    private Role role;

    private Boolean isEnabled;


    //@NotNull(message = Messages.userBirthDateNotEmpty)
    private LocalDate birthDate;

    private String userPhotoUrl;

    public Role getRole() {
        return (role == null) ? Role.USER : role;
    }
}
