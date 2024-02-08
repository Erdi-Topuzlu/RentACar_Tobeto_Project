package com.tobeto.RentACar.core.config;

import java.sql.Connection;

public class TriggerConfig {

    Connection connection =
    private static void createUpdateCarAvailabilityFunction(Connection connection) throws SQLException {
        String updateFunctionSQL =
                "CREATE OR REPLACE FUNCTION update_car_availability_trigger()\n" +
                        "RETURNS TRIGGER AS\n" +
                        "$$\n" +
                        "BEGIN\n" +
                        "    UPDATE public.cars\n" +
                        "    SET is_Available = false\n" +
                        "    WHERE id = NEW.car_id;\n" +
                        "    RETURN NEW;\n" +
                        "END;\n" +
                        "$$\n" +
                        "LANGUAGE plpgsql;";

        try (Statement statement = connection.createStatement()) {
            statement.executeUpdate(updateFunctionSQL);
        }
    }

    private static void createRentalAddedTrigger(Connection connection) throws SQLException {
        String createTriggerSQL =
                "CREATE TRIGGER rental_added_trigger\n" +
                        "AFTER INSERT ON public.rentals\n" +
                        "FOR EACH ROW\n" +
                        "EXECUTE FUNCTION update_car_availability_trigger();";

        try (Statement statement = connection.createStatement()) {
            statement.executeUpdate(createTriggerSQL);
        }
    }
}
