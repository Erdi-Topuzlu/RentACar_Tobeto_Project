
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

export const gearType = (gear, t) => {
  
  switch (gear) {
    case "MANUAL":
      return t("manual");
    case "AUTOMATIC":
      return t("automatic");
    default:
      return gear;
  }
};

export const fuelType = (fuel, t) => {
   switch (fuel) {
    case "DIESEL":
      return t("diesel");
    case "GASOLINE":
      return t("gasoline");
    case "HYBRID":
      return t("hybrid");
    case "ELECTRIC":
      return t("electric");
    default:
      return fuel;
  }
};

export const vehicleType = (vehicle, t) => {
  switch (vehicle) {
    case "SUV":
      return t("suv");
    case "SEDAN":
      return t("sedan");
    case "HB":
      return t("hatchback");
    default:
      return vehicle;
  }
};
