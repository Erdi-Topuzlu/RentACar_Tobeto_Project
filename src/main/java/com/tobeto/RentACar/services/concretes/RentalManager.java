package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.data.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.Rental;
import com.tobeto.RentACar.repositories.RentalRepository;
import com.tobeto.RentACar.services.abstracts.BrandService;
import com.tobeto.RentACar.services.abstracts.RentalService;
import com.tobeto.RentACar.services.dtos.requests.rental.AddRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.DeleteRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.UpdateRentalRequest;
import com.tobeto.RentACar.services.dtos.responses.model.GetAllModelResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetAllRentalResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RentalManager implements RentalService {
    private final RentalRepository rentalRepository;
    private final ModelMapperService modelMapperService;
    @Override
    public void add(AddRentalRequest request) {
        Rental rental = modelMapperService.dtoToEntity().map(request, Rental.class);
        rentalRepository.save(rental);
    }

    @Override
    public void update(UpdateRentalRequest request) {
        Rental rental = modelMapperService.dtoToEntity().map(request, Rental.class);
        rentalRepository.save(rental);
    }

    @Override
    public DeleteRentalRequest delete(int id) {
        Rental rental = rentalRepository.findById(id).orElseThrow();
        rentalRepository.deleteById(rental.getId());
        return modelMapperService.entityToDto().map(rental, DeleteRentalRequest.class);
    }

    @Override
    public List<GetAllRentalResponse> getAll() {
        List<Rental>rentals = rentalRepository.findAll();
        List<GetAllRentalResponse> rentalResponses = rentals.stream()
                .map(rental -> modelMapperService.entityToDto().map(rental, GetAllRentalResponse.class))
                .collect(Collectors.toList());
        return rentalResponses;
    }

    @Override
    public GetByIdRentalResponse getById(int id) {
        Rental rental = rentalRepository.findById(id).orElseThrow();
        GetByIdRentalResponse response = modelMapperService.entityToDto()
                .map(rental, GetByIdRentalResponse.class);
        return response;
    }
}
