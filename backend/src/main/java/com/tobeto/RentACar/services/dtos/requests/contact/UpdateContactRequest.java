package com.tobeto.RentACar.services.dtos.requests.contact;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateContactRequest {

    private int id;

    @NotBlank(message = Messages.contactNotEmpty)
    private String name;

    @NotBlank(message = Messages.contactEmailNotEmpty)
    @Email(message = Messages.invalidEmail)
    private String email;

    @NotBlank(message = Messages.contactMessagesNotEmpty)
    @Size(min = 10, max = 400, message = Messages.contactMessagesMustBe)
    private String messages;
}
