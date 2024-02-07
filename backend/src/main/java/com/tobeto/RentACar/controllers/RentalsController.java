package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.RentalService;
import com.tobeto.RentACar.services.dtos.requests.rental.AddRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.DeleteRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.UpdateRentalRequest;
import com.tobeto.RentACar.services.dtos.responses.rental.GetAllRentalResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users/rentals")
@AllArgsConstructor
@Tag(name = "Rentals Controller", description = "Rentals Endpoints")
public class RentalsController {
    private final RentalService rentalService;

    @GetMapping
    public List<GetAllRentalResponse> getAll() {
        return rentalService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdRentalResponse getById(@PathVariable int id) {
        return rentalService.getById(id);
    }

    @GetMapping("/byUser/{id}")
    public List<GetAllRentalResponse>getByUserId(@PathVariable int id) {
        return rentalService.getByUserId(id);
    }

    @DeleteMapping("/{id}")
    public DeleteRentalRequest delete(@PathVariable int id) {
        return rentalService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddRentalRequest request) {
        rentalService.add(request);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateRentalRequest request) {
        rentalService.update(request);
    }


}
