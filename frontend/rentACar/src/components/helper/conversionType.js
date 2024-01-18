import { useTranslation } from "react-i18next";

export const seatType = (seat) => {
  switch (seat) {
    case "TWO":
      return "2";
    case "FIVE":
      return "5";
    case "SEVEN":
      return "7";
    default:
      return seat;
  }
};

export const gearType = (gear) => {
  switch (gear) {
    case "MANUAL":
      return "Manual";
    case "AUTOMATIC":
      return "Automatic";
    default:
      return gear;
  }
};

export const fuelType = (fuel) => {
  switch (fuel) {
    case "DIESEL":
      return "Diesel";
    case "GASOLINE":
      return "Gasoline";
    case "HYBRID":
      return "Hybrid";
    case "ELECTRIC":
      return "Electric";
    default:
      return fuel;
  }
};

export const vehicleType = (vehicle) => {
  switch (vehicle) {
    case "SUV":
      return "SUV";
    case "SEDAN":
      return "Sedan";
    case "HB":
      return "Hatchback";
    default:
      return vehicle;
  }
};
