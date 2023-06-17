/* eslint-disable react/no-unescaped-entities */
import { GiDrinking } from "react-icons/gi";
import { useCreateDepartmentMutation } from "../../redux/api/apiSlice";
import { useState } from "react";
import { errorToast, successToast } from "../../hooks/toast-messages";

export default function Services() {
  const [department, setDepartment] = useState();
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDepartment("bar");

    try {
      const createDepart = await createDepartment({
        name: department,
      }).unwrap();
      console.log(createDepart);
      successToast("Activated");
    } catch (error) {
      console.error(error);
      errorToast(error?.data?.message || "Not activated");
    }
  };

  return (
    <div className="px-[25px] pt-[72px]">
      <div className="flex flex-col md:flex-row justify-between">
        <div className=" md:basis-1/2">
          <h1 className="text-blue/80 font-bold text-2xl my-2 dark:text-dark-text-fill">
            Services
          </h1>
          <p className="mt-10 text-gray-700 dark:text-dark-text-fill font-medium">
            Welcome to our system! To begin, please activate the services you
            wish to utilize and empower the users who will sell or oversee those
            services. Let's create a dynamic ecosystem together!
          </p>
          <div className="border rounded p-2 my-4">
            <div className="flex flex-row justify-between items-center border-b pb-2 ">
              <div className=" flex  flex-row items-center">
                <div className="w-10 h-10 bg-blue rounded-full flex items-center justify-center">
                  <GiDrinking className="text-2xl text-green-500" />
                </div>
                <p className="font font-semibold text-gray-700 dark:text-dark-text-fill ml-2">
                  Bar Services
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <button
                  onClick={handleSubmit}
                  className="py-2 px-4 bg-blue hover:bg-blue/75 text-gray-700 dark:text-dark-text-fill font-semibold mx-2 rounded"
                >
                  {isLoading ? "Loading..." : "Activate"}
                </button>
                <button className="py-2 px-4 bg-blue/50 text-gray-700 dark:text-dark-text-fill font-semibold mx-2 rounded">
                  Disable
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center border-b pb-2 my-4">
              <div className=" flex  flex-row items-center">
                <div className="w-10 h-10 bg-blue rounded-full flex items-center justify-center">
                  <GiDrinking className="text-2xl text-green-500" />
                </div>
                <p className="font font-semibold text-gray-700 dark:text-dark-text-fill ml-2">
                  Kitchen Services
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <button className="py-2 px-4 bg-blue hover:bg-blue/75 text-gray-700 dark:text-dark-text-fill font-semibold mx-2 rounded">
                  Activate
                </button>
                <button className="py-2 px-4 bg-blue/50 text-gray-700 dark:text-dark-text-fill font-semibold mx-2 rounded">
                  Disable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
