package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.CarService;
import com.tobeto.RentACar.services.dtos.requests.car.AddCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.DeleteCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.UpdateCarRequest;
import com.tobeto.RentACar.services.dtos.responses.car.GetAllCarResponse;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cars")
public class CarsController {
    private final CarService carService;

    public CarsController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public List<GetAllCarResponse> getAll() {
        return carService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdCarResponse getById(@PathVariable int id) {return carService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteCarRequest delete(@PathVariable int id) {
        return carService.delete(id);
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody @Valid AddCarRequest request) {
        carService.add(request);
    }

    @PutMapping
    public void update(@RequestBody UpdateCarRequest request) {
        carService.update(request);
    }

}
