package com.tobeto.RentACar.core.utilities.exceptions;

public record Messages() {

    //Brand Messages
    public static final String brandNameNotEmpty = "Brand Name cannot be empty!";
    public static final String brandNameSize = "Brand Name must consist of at least 2 letters!";


    //Car Messages
    public static final String kilometerNotEmpty = "Kilometer cannot be empty!";
    public static final String kilometerPositive = "Kilometer of the vehicle must be greater than 0!";

    public static final String plateNotEmpty = "Plate cannot be empty!";
    public static final String invalidPlate="Invalid plate format!";

    public static final String yearNotEmpty = "Vehicle year cannot be empty!";
    public static final String minModelYear = "Model year must be at least 2005!";
    public static final String maxModelYear = "Model year must be smaller than 2024!";


    public static final String dailyPriceNotEmpty = "Daily Price cannot be empty!!";
    public static final String dailyPricePositive = "Daily Price must be greater than 0₺!";

    public static final String colorIdNotEmpty = "Color ID cannot be empty!";
    public static final String colorIdPositive = "Color ID must be greater than 0!";


    public static final String modelIdNotEmpty = "Model ID cannot be empty!";
    public static final String modelIdPositive = "Model ID must be greater than 0!";


    //Color Messages
    public static final String colorNameNotEmpty = "Color Name cannot be empty!";
    public static final String colorNameSize = "Color Name must consist of at least 2 letters!";


    //Invoice Messages
    public static final String createDateNotEmpty = "Create Date cannot be empty!";
    public static final String rentalIdNotEmpty = "Rental ID cannot be empty!";
    public static final String rentalIdPositive = "Rental ID must be greater than 0!";


    //Model Messages
    public static final String modelNameNotEmpty = "Model Name cannot be empty!";
    public static final String modelNameSize = "Model Name must consist of at least 2 letters!";
    public static final String brandIdNotEmpty = "Brand ID cannot be empty!";
    public static final String brandIdPositive = "Brand ID must be greater than 0!";


    //Rental Messages

    public static final String startDateNotBeforeToday = "Start date can't be any later than today!";
    public static final String carIdNotEmpty = "Car ID cannot be empty!";
    public static final String carIdPositive = "Car ID must be greater than 0!";

    public static final String userIdNotEmpty = "User ID cannot be empty!";
    public static final String userIdPositive = "User ID must be greater than 0!";



    //User Messages

    public static final String userNameNotEmpty = "User Name cannot be empty!";
    public static final String userSurnameNotEmpty = "User Surname cannot be empty!";
    public static final String userEmailNotEmpty = "User E-Mail cannot be empty!";
    public static final String invalidEmail = "Invalid E-Mail format!";
    public static final String userBirthDateNotEmpty = "User Birthdate cannot be empty!";


    //Slider & Car Images Messages
    public static final String imgPathNotEmpty = "Image field cannot be empty!";


}
