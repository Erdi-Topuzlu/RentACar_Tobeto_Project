package com.tobeto.RentACar;

import com.tobeto.RentACar.entities.concretes.GearType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RentACarApplication {

	public static void main(String[] args){
		SpringApplication.run(RentACarApplication.class, args);
		System.out.println("System is up!");
	}
}
