package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.color.AddColorRequest;
import com.tobeto.RentACar.services.dtos.requests.color.DeleteColorRequest;
import com.tobeto.RentACar.services.dtos.requests.color.UpdateColorRequest;
import com.tobeto.RentACar.services.dtos.responses.color.GetAllColorResponse;
import com.tobeto.RentACar.services.dtos.responses.color.GetByIdColorResponse;

import java.util.List;

public interface ColorService {

    void add(AddColorRequest request);

    void update(UpdateColorRequest request);

    DeleteColorRequest delete(int id);

    List<GetAllColorResponse> getAll();

    GetByIdColorResponse getById(int id);

    boolean existsById (int id);


}
