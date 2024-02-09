package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.slider.AddSliderRequest;
import com.tobeto.RentACar.services.dtos.requests.slider.DeleteSliderRequest;
import com.tobeto.RentACar.services.dtos.requests.slider.UpdateSliderRequest;
import com.tobeto.RentACar.services.dtos.responses.slider.GetAllSliderResponse;
import com.tobeto.RentACar.services.dtos.responses.slider.GetByIdSliderResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SliderService {
    void add(AddSliderRequest request);

    void update(UpdateSliderRequest request);

    DeleteSliderRequest delete(int id);

    List<GetAllSliderResponse> getAll();

    GetByIdSliderResponse getById(int id);

    String uploadSliderPhotoUrl(Integer id, MultipartFile file);

}
