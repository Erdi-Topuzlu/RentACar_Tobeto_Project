package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.rental.Rental;
import com.tobeto.RentACar.repositories.RentalRepository;
import com.tobeto.RentACar.rules.rental.RentalBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.CarService;
import com.tobeto.RentACar.services.abstracts.RentalService;
import com.tobeto.RentACar.services.dtos.requests.rental.AddRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.DeleteRentalRequest;
import com.tobeto.RentACar.services.dtos.requests.rental.UpdateRentalRequest;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetAllRentalResponse;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class RentalManager implements RentalService {
    private final RentalRepository rentalRepository;
    private final ModelMapperService modelMapperService;
    private final RentalBusinessRulesService rentalBusinessRulesService;
    private final CarService carService;
    @Override
    public void add(AddRentalRequest request) {
        rentalBusinessRulesService.checkIfEndDateBeforeStartDate(request.getEndDate(),request.getStartDate());
        rentalBusinessRulesService.checkIfCarIdExists(request.getCarId());
        rentalBusinessRulesService.checkIfUserIdExists(request.getUserId());
        rentalBusinessRulesService.checkMaxRentTime(request.getEndDate(), request.getStartDate());


        Rental rental = modelMapperService.dtoToEntity().map(request, Rental.class);
        GetByIdCarResponse carId = carService.getById(request.getCarId());
        rental.setStartKilometer(carId.getKilometer());

        if (rental.getReturnDate() == null){
            Double totalPrice = ChronoUnit.DAYS.between(rental.getStartDate(), rental.getEndDate()) * carId.getDailyPrice();
            rental.setTotalPrice(totalPrice);
        }else {
            Double totalPrice = ChronoUnit.DAYS.between(rental.getStartDate(), rental.getReturnDate()) * carId.getDailyPrice() ;
            rental.setTotalPrice(totalPrice);
        }

        rentalRepository.save(rental);
    }

    @Override
    public void update(UpdateRentalRequest request) {
        rentalBusinessRulesService.checkIfByIdExists(request.getId());
        rentalBusinessRulesService.checkIfEndDateBeforeStartDate(request.getEndDate(),request.getStartDate());
        rentalBusinessRulesService.checkIfReturnDateBeforeStartDate(request.getReturnDate(), request.getStartDate());
        rentalBusinessRulesService.checkIfCarIdExists(request.getCarId());
        rentalBusinessRulesService.checkIfUserIdExists(request.getUserId());
        rentalBusinessRulesService.checkMaxRentTime(request.getEndDate(), request.getStartDate());


        Rental rental = modelMapperService.dtoToEntity().map(request, Rental.class);
        GetByIdCarResponse carId = carService.getById(request.getCarId());
        rental.setStartKilometer(carId.getKilometer());

        if (rental.getReturnDate() == null){
            Double totalPrice = ChronoUnit.DAYS.between(rental.getStartDate(), rental.getEndDate()) * carId.getDailyPrice();
            rental.setTotalPrice(totalPrice);
        }else if(request.getTotalPrice()>0) {
            rental.setTotalPrice(request.getTotalPrice());
        }else{
            Double totalPrice = ChronoUnit.DAYS.between(rental.getStartDate(), rental.getReturnDate()) * carId.getDailyPrice();
            rental.setTotalPrice(totalPrice);
        }


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
                .map(rental -> modelMapperService.entityToDto().map(rental, GetAllRentalResponse.class)).toList();
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
