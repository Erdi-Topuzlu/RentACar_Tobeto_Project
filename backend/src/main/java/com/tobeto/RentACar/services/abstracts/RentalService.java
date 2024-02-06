package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.rental.AddRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.DeleteRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.UpdateRentalRequest;
import com.tobeto.RentACar.services.dtos.responses.rental.GetAllRentalResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;

import java.util.List;

public interface RentalService {
    void add(AddRentalRequest request);
    void update(UpdateRentalRequest request);

    DeleteRentalRequest delete(int id);

    List<GetAllRentalResponse>getAll();

    List<GetAllRentalResponse>getByUserId(int id);

    GetByIdRentalResponse getById(int id);

}
