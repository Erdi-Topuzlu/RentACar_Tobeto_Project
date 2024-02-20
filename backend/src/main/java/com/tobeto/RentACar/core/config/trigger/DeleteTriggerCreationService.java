package com.tobeto.RentACar.core.config.trigger;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class DeleteTriggerCreationService {

    private final JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void createTriggers() {
        createUpdateCarAvailabilityFunction();
        createRentalDeletedTrigger();
    }

    private void createUpdateCarAvailabilityFunction() {
        String updateFunctionSQL =
                "CREATE OR REPLACE FUNCTION delete_car_availability_trigger()\n" +
                        "RETURNS TRIGGER AS\n" +
                        "$$\n" +
                        "BEGIN\n" +
                        "    CASE TG_OP\n" +
                        "        WHEN 'DELETE' THEN\n" +
                        "            UPDATE public.cars\n" +
                        "            SET is_available = true\n" +
                        "            WHERE id = OLD.car_id;\n" +
                        "    END CASE;\n" +
                        "    RETURN NEW;\n" +
                        "END;\n" +
                        "$$\n" +
                        "LANGUAGE plpgsql;";

        jdbcTemplate.execute(updateFunctionSQL);
    }

    private void createRentalDeletedTrigger() {
        String triggerName = "rental_deleted_trigger";

        if (!triggerExists(triggerName)) {
            String createTriggerSQL =
                    "CREATE TRIGGER " + triggerName + "\n" +
                            "AFTER DELETE ON public.rentals\n" +
                            "FOR EACH ROW\n" +
                            "EXECUTE FUNCTION delete_car_availability_trigger();";

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
