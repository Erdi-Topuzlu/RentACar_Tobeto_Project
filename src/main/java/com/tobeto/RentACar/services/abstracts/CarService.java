package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.car.AddCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.DeleteCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.UpdateCarRequest;
import com.tobeto.RentACar.services.dtos.responses.car.GetAllCarResponse;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;

import java.util.List;

public interface CarService {

    void add(AddCarRequest request);

    void update(UpdateCarRequest request);

    DeleteCarRequest delete(int id);

    List<GetAllCarResponse> getAll();

    GetByIdCarResponse getById(int id);

    boolean existsByPlate(String plate);

}
