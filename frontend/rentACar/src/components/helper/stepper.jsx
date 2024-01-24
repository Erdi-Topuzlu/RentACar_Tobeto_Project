
import { Stepper } from "react-form-stepper";

export function CustomStepper(props) {
    return (
        <>
      <Stepper
        {...props}
        connectorStateColors={true}
        connectorStyleConfig={{
          completedColor: "#673ab7",
          activeColor: "#f9a826",
          disabledColor: "#eee",
        }}
        styleConfig={{
          activeBgColor: "#f9a826",
          completedBgColor: "#673ab7",
          inactiveBgColor: "#eee",
          activeTextColor: "#000",
          completedTextColor: "#eee",
          inactiveTextColor: "#444",
        }}
      />
      </>
    );
  }