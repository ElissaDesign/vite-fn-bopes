import { useState } from "react";
import StepperControl from "../components/stepper-control";
import { UseContextProvider } from "../context/stepper-context";
import { useSelector } from "react-redux";
import axios from "axios";
import Account from "../components/steps/Account";
import Details from "../components/steps/Details";
import Company from "../components/steps/Company";
import Final from "../components/steps/Final";
import { errorToast, successToast } from "../hooks/toast-messages";
import Navbar from "../components/navBar";
import Stepper from "../components/stepper.jsx";

function Startup() {
  const userData = useSelector((state) => state.startup.startup);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const steps = ["Company", "About you", "Account", "Complete"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Company />;
      case 2:
        return <Details />;
      case 3:
        return <Account />;
      case 4:
        return <Final />;
      default:
    }
  };

  //   const handleClick = (direction) => {
  //     let newStep = currentStep;

  //     direction === "next" ? newStep++ : newStep--;
  //     // check if steps are within bounds
  //     newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  //   };

  const handleClick = async (direction) => {
    let newStep = currentStep;

    if (direction === "next") {
      // Check if it's the last step
      if (currentStep === steps.length - 1) {
        // Run your specific function before handling the "next" action
        const result = await handleSubmitFunction();

        if (result.error) {
          // If there's an error, prevent the transition and show the error message
          return errorToast(result.errorMessage);
        }
      }

      // Increment the step
      newStep++;
    } else {
      // Decrement the step
      newStep--;
    }

    // Check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const handleSubmitFunction = async () => {
    if (!userData.companyName) {
      return { error: true, errorMessage: "company name required" };
    }
    if (!userData.companyemail) {
      return { error: true, errorMessage: "company email required" };
    }
    if (!userData.contact) {
      return { error: true, errorMessage: "contact required" };
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      successToast("yeppp");

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/organizations/create`,
        { userData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        return { error: true };
      }

      return { error: false };
    } catch (error) {
      console.error("Error creating company:", error);
      setIsLoading(false);

      // You can return additional error information if needed
      return { error: true, errorMessage: "Error creating company" };
    }
  };

  return (
    <div className="dark:bg-dark-bg h-screen overflow-x-hidden antialiased ">
      <Navbar />
      <div className="mx-auto rounded-2xl bg-white mt-32 pb-2 shadow-xl w-full md:w-[75%] lg:w-2/5">
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
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default Startup;
