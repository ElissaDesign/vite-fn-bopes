import { useStepperContext } from "../../context/stepper-context";

export default function Details() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-xl font-bold text-gray-300">About you</h1>
        <p className="text-sm font-light my-2">
          We’ll use this info to personalize your experience
        </p>
      </div>
      <div className="flex flex-col ">
        <div className="border-b border-gray_white w-full my-8">
          <select
            name="role"
            onChange={handleChange}
            value={userData["role"] || ""}
            className="w-full p-1 px-2 text-gray outline-none font-light"
          >
            <option value={"What is your current role?"}>
              What is your current role?
            </option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <div className="border-b border-[#7B7B7B] w-full my-8">
          <select
            name="experience"
            onChange={handleChange}
            value={userData["experience"] || ""}
            className="w-full p-1 px-2 text-gray-300 outline-none font-light"
          >
            <option value="">What is your experience with sales tools?</option>
            <option value="I haven't used any sales tools before">
              I haven&#39;t used any sales tools before
            </option>
            <option value="I use spreadsheets to track my sales data">
              I use spreadsheets to track my sales data
            </option>
            <option value="I've used a CRM for my sales activities">
              I&#39;ve used a CRM for my sales activities
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
