package com.tobeto.RentACar.rules.rental;

import java.time.LocalDate;

public interface RentalBusinessRulesService {
    void checkIfStartDate(LocalDate startDate);
    void checkIfEndDate(LocalDate endDate);
    void checkIfCarIdExists(int id);
    void checkIfUserIdExists(int id);
    void checkMaxRentDay(LocalDate startDate, LocalDate endDate);
    
}
