package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.model.AddModelRequest;
import com.tobeto.RentACar.services.dtos.requests.model.DeleteModelRequest;
import com.tobeto.RentACar.services.dtos.requests.model.UpdateModelRequest;
import com.tobeto.RentACar.services.dtos.responses.model.GetAllModelResponse;
import com.tobeto.RentACar.services.dtos.responses.model.GetByIdModelResponse;

import java.util.List;

public interface ModelService {
    void add(AddModelRequest request);
    void update(UpdateModelRequest request);

    DeleteModelRequest delete(int id);

    List<GetAllModelResponse>getAll();

    GetByIdModelResponse getById(int id);
}
