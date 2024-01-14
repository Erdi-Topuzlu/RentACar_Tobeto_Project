package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.CarImageService;
import com.tobeto.RentACar.services.dtos.requests.carImage.AddCarImageRequest;
import com.tobeto.RentACar.services.dtos.requests.carImage.DeleteCarImageRequest;
import com.tobeto.RentACar.services.dtos.requests.carImage.UpdateCarImageRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.AddRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.DeleteRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.UpdateRentalRequest;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetAllCarImageResponse;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetByIdCarImageResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetAllRentalResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/car-images")
@AllArgsConstructor
public class CarImagesController {
    private final CarImageService carImageService;

    @GetMapping
    public List<GetAllCarImageResponse> getAll(){
        return carImageService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdCarImageResponse getById(@PathVariable int id){
        return carImageService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteCarImageRequest delete(@PathVariable int id){
        return carImageService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddCarImageRequest request){
        carImageService.add(request);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateCarImageRequest request){
        carImageService.update(request);
    }

}
