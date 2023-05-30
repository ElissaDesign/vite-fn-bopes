import { useStepperContext } from "../../context/stepper-context";
import { BiBuildingHouse } from "react-icons/bi";

export default function Company() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-xl font-bold text-gray">About your company</h1>
        <p className="text-sm font-light my-2">
          We’ll use this info to personalize your experience
        </p>
      </div>

      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex items-center border-b border-gray_white bg-white p-1">
          <BiBuildingHouse />
          <input
            onChange={handleChange}
            value={userData["companyName"] || ""}
            name="companyName"
            type="text"
            placeholder="Company name"
            className="w-full appearance-none p-1 px-2 text-gray outline-none font-light"
          />
        </div>
      </div>

      <div className="border-b border-gray_white w-full my-8">
        <select
          name="industry"
          onChange={handleChange}
          value={userData["industry"] || ""}
          className="w-full p-1 px-2 text-gray outline-none font-light"
        >
          <option value="">Company industry?</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Construction">Construction</option>
          <option value="Transporting and storage">
            Transporting and storage
          </option>
          <option value="Tourism">Tourism</option>
        </select>
      </div>

      <div className="flex flex-col justify-center">
        <h1 className=" text-xl font-bold text-gray">
          How many peaple in your company will use Wsimplify?
        </h1>
        <p className="text-sm font-light my-2">
          This is just for info. You can invite users at any time.
        </p>

        <div className="border-b border-gray_white w-full my-8">
          <select
            name="workers"
            onChange={handleChange}
            value={userData["workers"] || ""}
            className="w-full p-1 px-2 text-gray outline-none font-light"
          >
            <option value="1">1</option>
            <option value="2-5">2-5</option>
            <option value="6-10">6-10</option>
          </select>
        </div>
      </div>
    </div>
  );
}
