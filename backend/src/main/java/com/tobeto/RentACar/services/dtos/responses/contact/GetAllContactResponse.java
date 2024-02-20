package com.tobeto.RentACar.services.dtos.responses.contact;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetAllContactResponse {
    private int id;
    private String name;
    private String email;
    private String messages;
}
