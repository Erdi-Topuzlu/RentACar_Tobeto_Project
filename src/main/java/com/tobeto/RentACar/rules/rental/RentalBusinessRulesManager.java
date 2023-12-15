package com.tobeto.RentACar.rules.rental;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.CarRepository;
import com.tobeto.RentACar.repositories.RentalRepository;
import com.tobeto.RentACar.repositories.UserRepository;
import com.tobeto.RentACar.services.abstracts.RentalService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@AllArgsConstructor
@Service
public class RentalBusinessRulesManager implements RentalBusinessRulesService {
    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;


    @Override
    public void checkIfEndDateBeforeStartDate(LocalDate endDate, LocalDate startDate) {
        if (endDate.isBefore(startDate)){
            throw new BusinessException("End date can't be any later than start date!");
        }
    }

    @Override
    public void checkIfCarIdExists(int id) {
        if (!carRepository.existsById(id)) {
            throw new BusinessException("CarId is Not Found!");
        }
    }

    @Override
    public void checkIfUserIdExists(int id) {
        if (!userRepository.existsById(id)) {
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
}
