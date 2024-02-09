package com.tobeto.RentACar.services.abstracts;


import com.tobeto.RentACar.services.dtos.responses.extras.GetAllExtrasResponse;
import com.tobeto.RentACar.services.dtos.responses.extras.GetByIdExtrasResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExtrasService {
    List<GetAllExtrasResponse> getAll();
    GetByIdExtrasResponse getById(int id);

    void addExtraIfNotExists (int id, String extraName, int extraPrice);

}
