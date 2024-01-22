package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.carImage.CarImage;
import com.tobeto.RentACar.repositories.CarImageRepository;
import com.tobeto.RentACar.rules.carImage.CarImageBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.CarImageService;
import com.tobeto.RentACar.services.abstracts.CarService;
import com.tobeto.RentACar.services.dtos.requests.carImage.AddCarImageRequest;
import com.tobeto.RentACar.services.dtos.requests.carImage.DeleteCarImageRequest;
import com.tobeto.RentACar.services.dtos.requests.carImage.UpdateCarImageRequest;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetAllCarImageResponse;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetByIdCarImageResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CarImageManager implements CarImageService {

    private final CarImageRepository carImageRepository;
    private final ModelMapperService modelMapperService;
    private final CarImageBusinessRulesService carImageBusinessRulesService;
    private final CarService carService;


    @Override
    public void add(AddCarImageRequest request) {
        carImageBusinessRulesService.checkIfCarIdExists(request.getCarId());
        CarImage carImage = modelMapperService.dtoToEntity().map(request, CarImage.class);
        carImageRepository.save(carImage);
    }

    @Override
    public void update(UpdateCarImageRequest request) {
        carImageBusinessRulesService.checkIfByIdExists(request.getId());
        carImageBusinessRulesService.checkIfCarIdExists(request.getCarId());
        CarImage carImage = modelMapperService.dtoToEntity().map(request, CarImage.class);
        carImageRepository.save(carImage);
    }

    @Override
    public DeleteCarImageRequest delete(int id) {
        CarImage carImage = carImageRepository.findById(id).orElseThrow();
        carImageRepository.deleteById(carImage.getId());
        return  modelMapperService.entityToDto().map(carImage, DeleteCarImageRequest.class);
    }

    @Override
    public List<GetAllCarImageResponse> getAll() {
        List<CarImage> carImages = carImageRepository.findAll();
        List<GetAllCarImageResponse> carImageResponses = carImages.stream()
                .map(carImage -> modelMapperService.entityToDto().map(carImage, GetAllCarImageResponse.class)).toList();
        return carImageResponses;
    }

    @Override
    public GetByIdCarImageResponse getById(int id) {
        CarImage carImage = carImageRepository.findById(id).orElseThrow();
        GetByIdCarImageResponse response = modelMapperService.entityToDto().map(carImage, GetByIdCarImageResponse.class);
        return response;
    }
}
