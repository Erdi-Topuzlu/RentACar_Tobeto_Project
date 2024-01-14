package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.carImage.AddCarImageRequest;
import com.tobeto.RentACar.services.dtos.requests.carImage.DeleteCarImageRequest;
import com.tobeto.RentACar.services.dtos.requests.carImage.UpdateCarImageRequest;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetAllCarImageResponse;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetByIdCarImageResponse;

import java.util.List;

public interface CarImageService {
    void add(AddCarImageRequest request);
    void update(UpdateCarImageRequest request);

    DeleteCarImageRequest delete(int id);

    List<GetAllCarImageResponse> getAll();

    GetByIdCarImageResponse getById(int id);

}
