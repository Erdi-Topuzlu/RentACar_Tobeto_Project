package com.tobeto.RentACar.rules.rental;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
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
            throw new BusinessException(Messages.endDateNotBeforeStartDate);
        }
    }

    @Override
    public void checkIfCarIdExists(int id) {
        if (!carService.existsById(id)) {
            throw new BusinessException(Messages.carIdNotFound);
        }
    }

    @Override
    public void checkIfUserIdExists(int id) {
        if (!userService.existsById(id)) {
            throw new BusinessException(Messages.userIdNotFound);
        }
    }

    @Override
    public void checkMaxRentTime(LocalDate startDate, LocalDate endDate) {
            if(ChronoUnit.DAYS.between(endDate, startDate)>25){
                throw new BusinessException(Messages.carRentMax25Days);
            }
    }

    @Override
    public void checkIfByIdExists(int id) {
        if (!rentalRepository.existsById(id)) {
            throw new BusinessException(Messages.rentalIdNotFound);
        }
    }

   /* @Override
    public void checkIfReturnDateBeforeStartDate(LocalDate returnDate, LocalDate startDate) {
        if(returnDate == null){
            return;
        }
        if (returnDate.isBefore(startDate)){
            throw new BusinessException(Messages.returnDateNotBeforeStartDate);
        }
    }*/
}
