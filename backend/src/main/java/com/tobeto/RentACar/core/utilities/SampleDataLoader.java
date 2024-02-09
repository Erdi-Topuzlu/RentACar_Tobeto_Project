package com.tobeto.RentACar.core.utilities;

import com.tobeto.RentACar.services.abstracts.ExtrasService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SampleDataLoader implements CommandLineRunner {

    private final ExtrasService extraService;
    @Override
    public void run(String... args) throws Exception {
        extraService.addExtraIfNotExists(1, "Mini", 200);
        extraService.addExtraIfNotExists(2, "Medium", 350);
        extraService.addExtraIfNotExists(3, "Free", 0);
    }
}
