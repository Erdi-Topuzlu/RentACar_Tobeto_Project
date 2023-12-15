package com.tobeto.RentACar.rules.rental;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@AllArgsConstructor
@Service
public class RentalBusinessRulesManager implements RentalBusinessRulesService {


    @Override
    public void checkIfStartDateBeforeToday(LocalDate startDate) {

    }

    @Override
    public void checkIfEndDateBeforeStartDate(LocalDate endDate) {

    }

    @Override
    public void checkIfCarIdExists(int id) {

    }

    @Override
    public void checkIfUserIdExists(int id) {

    }

    @Override
    public void checkMaxRentTime(LocalDate startDate, LocalDate endDate) {

    }
}
