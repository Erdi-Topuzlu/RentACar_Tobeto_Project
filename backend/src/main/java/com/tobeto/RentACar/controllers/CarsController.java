package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.entities.concretes.GearType;
import com.tobeto.RentACar.services.abstracts.CarService;
import com.tobeto.RentACar.services.dtos.requests.car.AddCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.DeleteCarRequest;
import com.tobeto.RentACar.services.dtos.requests.car.UpdateCarRequest;
import com.tobeto.RentACar.services.dtos.responses.car.GetAllCarResponse;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/cars")
@Tag(name = "Cars Controller", description = "Cars Endpoints")
public class CarsController {
    private final CarService carService;

    public CarsController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/getAll")
    public List<GetAllCarResponse> getAll() {
        return carService.getAll();
    }

    @GetMapping("/getById/{id}")
    public GetByIdCarResponse getById(@PathVariable int id) {
        return carService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteCarRequest delete(@PathVariable int id) {
        return carService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddCarRequest request) {
        carService.add(request);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable int id,@RequestBody @Valid UpdateCarRequest request) {
        carService.update(id,request);
    }


}
