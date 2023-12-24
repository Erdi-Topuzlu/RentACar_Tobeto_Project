package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.brand.AddBrandRequest;
import com.tobeto.RentACar.services.dtos.requests.brand.DeleteBrandRequest;
import com.tobeto.RentACar.services.dtos.requests.brand.UpdateBrandRequest;
import com.tobeto.RentACar.services.dtos.responses.brand.GetAllBrandResponse;
import com.tobeto.RentACar.services.dtos.responses.brand.GetByIdBrandResponse;


import java.util.List;

public interface BrandService {

    void add(AddBrandRequest request);

    void update(UpdateBrandRequest request);

    DeleteBrandRequest delete(int id);

    List<GetAllBrandResponse> getAll();

    GetByIdBrandResponse getById(int id);

    boolean existsById (int id);
}
