package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.RentalService;
import com.tobeto.RentACar.services.dtos.requests.rental.AddRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.DeleteRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.UpdateRentalRequest;
import com.tobeto.RentACar.services.dtos.responses.rental.GetAllRentalResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/rentals")
@AllArgsConstructor
public class RentalsController {
    private final RentalService rentalService;

    @GetMapping
    public List<GetAllRentalResponse>getAll(){
        return rentalService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdRentalResponse getById(@PathVariable int id){
        return rentalService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteRentalRequest delete(@PathVariable int id){
        return rentalService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody AddRentalRequest request){
        rentalService.add(request);
    }

    @PutMapping
    public void update(@RequestBody UpdateRentalRequest request){
        rentalService.update(request);
    }


}
