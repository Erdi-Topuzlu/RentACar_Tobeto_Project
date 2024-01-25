package com.tobeto.RentACar.services.dtos.requests.user;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.security.entities.Role;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

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

    private Role role;

    /*@NotBlank(message = Messages.userEmailNotEmpty)
    @Email(message = Messages.invalidEmail)*/
    private String email;

    //@NotNull(message = Messages.userBirthDateNotEmpty)
    private LocalDate birthDate;

    private String password;

    public Role getRole() {
        return (role == null) ? Role.USER : role;
    }

}
