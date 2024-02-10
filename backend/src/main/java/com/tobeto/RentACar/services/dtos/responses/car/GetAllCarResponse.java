package com.tobeto.RentACar.services.dtos.responses.car;

import com.tobeto.RentACar.entities.concretes.FuelType;
import com.tobeto.RentACar.entities.concretes.GearType;
import com.tobeto.RentACar.entities.concretes.SeatType;
import com.tobeto.RentACar.entities.concretes.VehicleType;
import com.tobeto.RentACar.entities.concretes.carImage.CarImage;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetAllCarImageResponse;
import com.tobeto.RentACar.services.dtos.responses.color.GetByIdColorResponse;
import com.tobeto.RentACar.services.dtos.responses.model.GetByIdModelResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllCarResponse {
    private int id;
    private int kilometer;
    private String plate;
    private int year;
    private double dailyPrice;
    GetByIdColorResponse colorId;
    GetByIdModelResponse modelId;
    FuelType fuelType;
    GearType gearType;
    VehicleType vehicleType;
    SeatType seatType;
    List<GetAllCarImageResponse> carImages;
    private Boolean isAvailable;

}
