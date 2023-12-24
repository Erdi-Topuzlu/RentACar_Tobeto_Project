package com.tobeto.RentACar.rules.rental;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.RentalRepository;
import com.tobeto.RentACar.services.abstracts.CarService;
import com.tobeto.RentACar.services.abstracts.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@AllArgsConstructor
@Service
public class RentalBusinessRulesManager implements RentalBusinessRulesService {
    private final RentalRepository rentalRepository;
    private final CarService carService;
    private final UserService userService;


    @Override
    public void checkIfEndDateBeforeStartDate(LocalDate endDate, LocalDate startDate) {
        if (endDate.isBefore(startDate)){
            throw new BusinessException("End date can't be any later than start date!");
        }
    }

    @Override
    public void checkIfCarIdExists(int id) {
        if (!carService.existsById(id)) {
            throw new BusinessException("CarId is Not Found!");
        }
    }

    @Override
    public void checkIfUserIdExists(int id) {
        if (!userService.existsById(id)) {
            throw new BusinessException("UserId is Not Found!");
        }
    }

    @Override
    public void checkMaxRentTime(LocalDate startDate, LocalDate endDate) {
            if(ChronoUnit.DAYS.between(endDate, startDate)>25){
                throw new BusinessException("Car rental is available for a maximum of 25 days!");
            }
    }

    @Override
    public void checkIfByIdExists(int id) {
        if (!rentalRepository.existsById(id)) {
            throw new BusinessException("Rentail Id Not Found !");
        }
    }

    @Override
    public void checkIfReturnDateBeforeStartDate(LocalDate returnDate, LocalDate startDate) {
        if(returnDate == null){
            return;
        }
        if (returnDate.isBefore(startDate)){
            throw new BusinessException("Return date can't be any later than start date!");
        }
    }
}
