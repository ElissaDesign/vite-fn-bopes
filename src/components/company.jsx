import { useState } from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { useCreateOrganizationMutation } from "../redux/api/apiSlice";
import { Spinner } from "@chakra-ui/react";
import { errorToast, successToast } from "../hooks/toast-messages";
import Details from "./company-details";

export default function Company() {
  const [name, setName] = useState("");
  const [createOrganization, { isLoading }] = useCreateOrganizationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const organization = await createOrganization({ name }).unwrap();
      console.log("OG", organization);
      successToast(organization?.message || "Created");
    } catch (error) {
      console.log("ERR", error);
      errorToast(error?.data?.message);
    }
  };
  return (
    <div>
      <div>
        <div className="flex flex-col justify-center items-center">
          <h1 className=" text-xl font-bold text-gray-300">
            About your company
          </h1>
          <p className="text-sm font-light my-2">
            We’ll use this info to personalize your experience
          </p>
        </div>

        <div className="mx-2 w-full flex-1">
          <div className="my-2 flex items-center border-b border-gray-200 bg-white p-1">
            <BiBuildingHouse />
            <input
              type="text"
              placeholder="Company name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="companyName"
              className="w-full appearance-none p-1 px-2 text-gray-300 outline-none font-light"
            />
          </div>
        </div>

        <div className="border-b border-gray-200 w-full my-8">
          <select
            name="industry"
            className="w-full p-1 px-2 text-gray-300 outline-none font-light"
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
          <h1 className=" text-xl font-bold text-gray-200">
            How many peaple in your company will use Apogee?
          </h1>
          <p className="text-sm font-light my-2">
            This is just for info. You can invite users at any time.
          </p>

          <div className="border-b border-gray-200 w-full my-8">
            <select
              name="workers"
              className="w-full p-1 px-2 text-gray-200 outline-none font-light"
            >
              <option value="1">1</option>
              <option value="2-5">2-5</option>
              <option value="6-10">6-10</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row justify-center">
          <button
            onClick={handleSubmit}
            className="py-2 px-4 text-white bg-blue rounded mx-6 font-semibold"
          >
            {isLoading ? <Spinner /> : "Create"}
          </button>
          <button className="py-2 px-4 text-white bg-blue rounded mx-6">
            Update
          </button>
        </div>
      </div>
      <div>
        <Details />
      </div>
    </div>
  );
}
