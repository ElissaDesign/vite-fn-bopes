import { useState } from "react";
import StepperControl from "../components/stepper-control";
import { UseContextProvider } from "../context/stepper-context";
import Account from "../components/steps/account";
import Details from "../components/steps/details";
import Company from "../components/steps/company";
import Final from "../components/steps/final";
import Stepper from "../components/stepper.jsx";

export default function Startup() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Account", "About you", "Company", "Complete"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Company />;
      case 4:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl w-full md:w-[75%] lg:w-2/5">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}
