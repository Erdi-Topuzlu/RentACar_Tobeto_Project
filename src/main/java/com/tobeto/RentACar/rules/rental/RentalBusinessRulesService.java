package com.tobeto.RentACar.rules.rental;

import java.time.LocalDate;

public interface RentalBusinessRulesService {
    void checkIfEndDateBeforeStartDate(LocalDate endDate, LocalDate startDate);
    void checkIfCarIdExists(int id);
    void checkIfUserIdExists(int id);
    void checkMaxRentTime(LocalDate startDate, LocalDate endDate);

}
