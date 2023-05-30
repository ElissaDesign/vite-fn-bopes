export default function StepperControl({ handleClick, currentStep, steps }) {
  return (
    <div className="container mt-4 mb-8 flex justify-around">
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer rounded border-[0.5px] border-blue bg-white py-2 px-4 font-regular text-slate-300 transition duration-200 ease-in-out hover:bg-blue_light hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      <button
        onClick={() => handleClick("next")}
        className="bg-blue cursor-pointer rounded py-2 px-4 font-regular text-white transition duration-200 ease-in-out hover:bg-blue_light hover:text-white"
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
}
