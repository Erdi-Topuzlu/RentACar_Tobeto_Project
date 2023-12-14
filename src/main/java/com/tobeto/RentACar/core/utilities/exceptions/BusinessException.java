package com.tobeto.RentACar.core.utilities.exceptions;

import org.springframework.validation.Errors;

public class BusinessException extends RuntimeException {
    public BusinessException(String message){
        super(message);
    }

}

