package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.responses.car.GetAllCarResponse;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import com.tobeto.RentACar.services.dtos.responses.extras.GetAllExtrasResponse;
import com.tobeto.RentACar.services.dtos.responses.extras.GetByIdExtrasResponse;

import java.util.List;

public interface ExtrasService {
    List<GetAllExtrasResponse> getAll();
    GetByIdExtrasResponse getById(int id);
}
