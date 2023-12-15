package com.tobeto.RentACar.rules.rental;

import java.time.LocalDate;

public interface RentalBusinessRulesService {
    void checkIfStartDateBeforeToday(LocalDate startDate);
    void checkIfEndDateBeforeStartDate(LocalDate endDate);
    void checkIfCarIdExists(int id);
    void checkIfUserIdExists(int id);
    void checkMaxRentTime(LocalDate startDate, LocalDate endDate);

}
