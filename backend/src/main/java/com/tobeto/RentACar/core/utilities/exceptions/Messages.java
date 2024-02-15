package com.tobeto.RentACar.core.utilities.exceptions;

public record Messages() {

    //Brand Messages
    public static final String brandIdNotEmpty = "BrandId cannot be empty!";
    public static final String brandIdPositive = "BrandId must be greater than 0!";
    public static final String brandNameNotEmpty = "Brand name can not be empty!";
    public static final String brandNameSize = "Brand name must consist of at least 2 character!";
    public static final String brandNameAlreadyExist = "Brand name is already exists!";
    public static final String brandIdNotFound = "BrandId not found!";


    //Car Messages
    public static final String carIdNotEmpty = "CarId can not be empty!";
    public static final String carIdPositive = "CarId must be greater than 0!";
    public static final String carIdNotFound = "CarId is Not Found!";
    public static final String kilometerNotEmpty = "Kilometer can not be empty!";
    public static final String kilometerPositive = "Kilometer of the vehicle must be greater than 0!";
    public static final String plateNotEmpty = "Plate can not be empty!";
    public static final String plateAlreadyExists= "Plate already exists!";
    public static final String invalidPlate="Invalid plate format!";
    public static final String yearNotEmpty = "Vehicle year can not be empty!";
    public static final String minModelYear = "Model year must be at least 2005!";
    public static final String maxModelYear = "Model year must be smaller than 2024!";
    public static final String dailyPriceNotEmpty = "Daily Price can not be empty!!";
    public static final String dailyPricePositive = "Daily Price must be greater than 0₺!";


    //Color Messages
    public static final String colorNameNotEmpty = "Color name can not be empty!";
    public static final String colorNameSize = "Color name must consist of at least 2 letters!";
    public static final String colorIdNotEmpty = "ColorId can not be empty!";
    public static final String colorIdPositive = "ColorId must be greater than 0!";
    public static final String colorIdNotFound = "ColorId is not found!";
    public static final String colorNameAlreadyExists = "Color name already exist!";


    //Invoice Messages
    public static final String createDateNotEmpty = "Create Date can not be empty!";
    public static final String invoiceIdNotFound= "InvoiceId not found!";


    //Model Messages
    public static final String modelNameNotEmpty = "Model name can not be empty!";
    public static final String modelNameSize = "Model name must consist of at least 2 letters!";
    public static final String modelIdNotEmpty = "ModelId can not be empty!";
    public static final String modelIdPositive = "ModelId must be greater than 0!";
    public static final String modelIdNotFound = "ModelId is not found!";
    public static final String modelNameAlreadyExists = "Model name already exists!";


    //Rental Messages
    public static final String rentalIdNotFound = "RentalId not found!";
    public static final String startDateNotBeforeToday = "Start date can not be any later than today!";
    public static final String endDateNotBeforeStartDate = "End date can not be any later than start date!";
    public static final String returnDateNotBeforeStartDate = "Return date can not be any later than start date!";
    public static final String rentalIdNotEmpty = "RentalId can not be empty!";
    public static final String rentalIdPositive = "RentalId must be greater than 0!";
    public static final String carRentMax25Days = "Car rental is available for a maximum of 25 days!";



    //User Messages

    public static final String userNameNotEmpty = "User name can not be empty!";
    public static final String userSurnameNotEmpty = "User surname can not be empty!";
    public static final String userEmailNotEmpty = "User E-Mail can not be empty!";
    public static final String invalidEmail = "Invalid E-Mail format!";
    public static final String userBirthDateNotEmpty = "User birthdate can not be empty!";
    public static final String userNotFound = "User name not found!";
    public static final String userIdNotFound = "UserId not found!";
    public static final String emailAlreadyExist = "E-mail already exist !";
    public static final String currentPswNotCorrect = "Current password is not correct";
    public static final String newAndConfirmPswNotSame = "New password and confirm password are not the same";
    public static final String newAndCurrentPswNotSame= "New password can not be the same as the current password";
    public static final String userIdNotEmpty = "UserId can not be empty!";
    public static final String userIdPositive = "UserId must be greater than 0!";


    //Slider & Car Images Messages
    public static final String imgPathNotEmpty = "Image field can not be empty!";
    public static final String unableToSaveImg= "Unable to save image";
    public static final String sliderIdNotFound = "SliderId not found!";
    public static final String carImgIdNotFound = "Car image id not found!";


    //Logout Messages
    public static final String tokenNotFound = "Token not found!";
    public static final String logoutSuccess = "Logout successful!";


    //Auth Messages
    public static final String unAuth = "Unauthorized";

    //Contact Messages
    public static final String contactNotEmpty = "Contact name can not be empty";
    public static final String contactEmailNotEmpty = "Contact email can not be empty";
    public static final String contactMessagesNotEmpty = "Contact messages can not be empty";
    public static final String contactMessagesMustBe = "Contact messages must have a minimum of 10 and a maximum of 400 characters.";





}
