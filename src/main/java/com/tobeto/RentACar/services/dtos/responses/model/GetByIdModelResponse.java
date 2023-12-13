package com.tobeto.RentACar.services.dtos.responses.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdModelResponse{
    private int id;
    private String name;
    private int brandId;
}
