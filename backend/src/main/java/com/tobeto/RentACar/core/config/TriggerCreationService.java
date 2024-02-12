package com.tobeto.RentACar.core.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;



@Component
@RequiredArgsConstructor
public class TriggerCreationService {

    private final JdbcTemplate jdbcTemplate;



    @PostConstruct
    public void createTriggers() {
        createUpdateCarAvailabilityFunction();
        createRentalAddedTrigger();
    }

    private void createUpdateCarAvailabilityFunction() {
        String updateFunctionSQL =
                "CREATE OR REPLACE FUNCTION update_car_availability_trigger()\n" +
                        "RETURNS TRIGGER AS\n" +
                        "$$\n" +
                        "BEGIN\n" +
                        "    UPDATE public.cars\n" +
                        "    SET is_available = false\n" +
                        "    WHERE id = NEW.car_id;\n" +
                        "    RETURN NEW;\n" +
                        "END;\n" +
                        "$$\n" +
                        "LANGUAGE plpgsql;";

        jdbcTemplate.execute(updateFunctionSQL);
    }

    private void createRentalAddedTrigger() {
        String triggerName = "rental_added_trigger";

        // Önce tetikleyici var mı kontrol et
        if (!triggerExists(triggerName)) {
            String createTriggerSQL =
                    "CREATE TRIGGER " + triggerName + "\n" +
                            "AFTER INSERT ON public.rentals\n" +
                            "FOR EACH ROW\n" +
                            "EXECUTE FUNCTION update_car_availability_trigger();";

            jdbcTemplate.execute(createTriggerSQL);
        }
    }

    private boolean triggerExists(String triggerName) {
        String checkTriggerSQL =
                "SELECT EXISTS (\n" +
                        "    SELECT 1\n" +
                        "    FROM pg_trigger\n" +
                        "    WHERE tgname = ?\n" +
                        ")";

        return jdbcTemplate.queryForObject(checkTriggerSQL, Boolean.class, triggerName);
    }
}
