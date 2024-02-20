package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.carImage.DeleteCarImageRequest;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetAllCarImageResponse;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetByIdCarImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarImageService {
    DeleteCarImageRequest delete(int id);

    List<GetAllCarImageResponse> getAll();

    GetByIdCarImageResponse getById(int id);

    String addCarImageUrl(Integer carId, MultipartFile file);

    String updateCarImageUrl(Integer id, MultipartFile file);

}
