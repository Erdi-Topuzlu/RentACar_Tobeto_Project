package com.tobeto.RentACar.services.dtos.responses.car;

import com.tobeto.RentACar.entities.concretes.FuelType;
import com.tobeto.RentACar.entities.concretes.GearType;
import com.tobeto.RentACar.entities.concretes.SeatType;
import com.tobeto.RentACar.entities.concretes.VehicleType;
import com.tobeto.RentACar.services.dtos.responses.color.GetByIdColorResponse;
import com.tobeto.RentACar.services.dtos.responses.model.GetByIdModelResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdCarResponse {
    private int kilometer;
    private String plate;
    private int year;
    private double dailyPrice;
    FuelType fuelType;
    GearType gearType;
    VehicleType vehicleType;
    SeatType seatType;
    GetByIdColorResponse colorId;
    GetByIdModelResponse modelId;
}
