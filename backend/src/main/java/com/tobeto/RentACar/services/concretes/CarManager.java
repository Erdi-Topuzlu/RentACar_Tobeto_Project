package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.car.Car;
import com.tobeto.RentACar.repositories.CarRepository;
import com.tobeto.RentACar.rules.car.CarBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.CarService;
import com.tobeto.RentACar.services.dtos.requests.car.AddCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.DeleteCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.UpdateCarRequest;
import com.tobeto.RentACar.services.dtos.responses.car.GetAllCarResponse;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CarManager implements CarService {
    private final CarRepository carRepository;
    private final ModelMapperService modelMapperService;
    private final CarBusinessRulesService carBusinessRulesService;

    @Override
    public void add(AddCarRequest request) {
        //Business Rules
        carBusinessRulesService.checkIfPlateNameExists(request.getPlate());
        carBusinessRulesService.checkIfColorIdExists(request.getColorId());
        carBusinessRulesService.checkIfModelIdExists(request.getModelId());

        Car car = modelMapperService.dtoToEntity().map(request, Car.class);
        car.setPlate(request.getPlate().toUpperCase());
        carRepository.save(car);
    }

    @Override
    public void update(UpdateCarRequest request,int id) {
        //Business Rules
        carBusinessRulesService.checkIfByIdExists(request.getId());
        carBusinessRulesService.checkIfPlateNameExists(request.getPlate());
        carBusinessRulesService.checkIfColorIdExists(request.getColorId());
        carBusinessRulesService.checkIfModelIdExists(request.getModelId());


        Car car = modelMapperService.dtoToEntity().map(request, Car.class);
        car.setPlate(request.getPlate().toUpperCase());
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
    public GetByIdCarResponse getById(int id){
        Car car = carRepository.findById(id).orElseThrow();
        GetByIdCarResponse response = modelMapperService.entityToDto()
                .map(car, GetByIdCarResponse.class);
        return response;
    }

    @Override
    public boolean existsById(int id) {
        return carRepository.existsById(id);
    }


}
