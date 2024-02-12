package com.tobeto.RentACar.core.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class EndDateTriggerCreationService {

    private final JdbcTemplate jdbcTemplate;
    @PostConstruct
    public void createTriggers() {
        createUpdateCarAvailabilityFunction();
        createEndDateAvailabilityTrigger();
    }

    private void createUpdateCarAvailabilityFunction() {
        String updateFunctionSQL =
                "CREATE OR REPLACE FUNCTION check_end_date()\n" +
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

    private void createEndDateAvailabilityTrigger() {
        String triggerName = "end_date_availability_trigger";

        if (!triggerExists(triggerName)) {
            String createTriggerSQL =
                    "CREATE TRIGGER " + triggerName + "\n" +
                            "AFTER UPDATE ON public.rentals\n" +
                            "FOR EACH ROW\n" +
                            "WHEN (NEW.end_date IS NOT NULL)\n" +
                            "EXECUTE PROCEDURE check_end_date();";

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
