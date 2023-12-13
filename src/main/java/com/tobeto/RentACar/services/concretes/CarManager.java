package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.Car;
import com.tobeto.RentACar.repositories.CarRepository;
import com.tobeto.RentACar.services.abstracts.CarService;
import com.tobeto.RentACar.services.abstracts.ColorService;
import com.tobeto.RentACar.services.abstracts.ModelService;
import com.tobeto.RentACar.services.dtos.requests.car.AddCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.DeleteCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.UpdateCarRequest;
import com.tobeto.RentACar.services.dtos.responses.car.GetAllCarResponse;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarManager implements CarService {
    private final CarRepository carRepository;
    private final ModelMapperService modelMapperService;
    private final ModelService modelService;
    private final ColorService colorService;

    public CarManager(CarRepository carRepository, ModelMapperService modelMapperService, ModelService modelService, ColorService colorService) {
        this.carRepository = carRepository;
        this.modelMapperService = modelMapperService;
        this.modelService = modelService;
        this.colorService = colorService;
    }

    @Override
    public void add(AddCarRequest request) {
        Car car = modelMapperService.dtoToEntity().map(request, Car.class);


        if(!modelService.existsById(request.getModelId())){
            throw new RuntimeException("Model ID veritabanında bulunamadı!");
        } else if (!colorService.existsById(request.getColorId())) {
            throw new RuntimeException(("Color ID veritabanında bulunamadı!"));
        } else if (carRepository.existsByPlate(request.getPlate())) {
            throw new RuntimeException(("Aynı plakadam 2 tane bulunamaz!"));
        }else
            carRepository.save(car);

    }

    @Override
    public void update(UpdateCarRequest request) {
        Car car = modelMapperService.dtoToEntity().map(request, Car.class);

        if(!modelService.existsById(request.getModelId())){
            throw new RuntimeException("Model ID veritabanında bulunamadı!");
        } else if (!colorService.existsById(request.getColorId())) {
            throw new RuntimeException(("Color ID veritabanında bulunamadı!"));
        } else if (carRepository.existsByPlate(request.getPlate())) {
            throw new RuntimeException(("Aynı plakadam 2 tane bulunamaz!"));
        }else
            carRepository.save(car);

    }

    @Override
    public DeleteCarRequest delete(int id) {
        Car car = carRepository.findById(id).orElseThrow();
        carRepository.deleteById(car.getId());
        return modelMapperService.entityToDto().map(car, DeleteCarRequest.class);
    }

    @Override
    public List<GetAllCarResponse> getAll() {
        List<Car> cars = carRepository.findAll();
        List<GetAllCarResponse> carResponses = cars.stream()
                .map(car -> modelMapperService.entityToDto()
                        .map(car, GetAllCarResponse.class)).toList();
        return carResponses;
    }

    @Override
    public GetByIdCarResponse getById(int id) {
        Car car = carRepository.findById(id).orElseThrow();
        GetByIdCarResponse response = modelMapperService.entityToDto()
                .map(car, GetByIdCarResponse.class);
        return response;
    }

    @Override
    public boolean existsByPlate(String plate) {
        return carRepository.existsByPlate(plate);
    }


}
