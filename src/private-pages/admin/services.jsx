import { GiDrinking } from "react-icons/gi";
import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
} from "../../redux/api/apiSlice";
import { useState } from "react";
import { errorToast, successToast } from "../../hooks/toast-messages";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import AssignUserDepartment from "../../components/assign-department";

/* eslint-disable react/no-unescaped-entities */
export default function Services() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [department, setDepartment] = useState();
  const { data } = useGetDepartmentsQuery();
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

  const ModelAssignDepartment = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">Assign Department</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AssignUserDepartment />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <div className=" md:basis-1/2">
          <h1 className="text-blue/80 font-bold text-2xl my-2">Services</h1>
          <p className="mt-10 text-gray-300 font-medium">
            Welcome to our system! To begin, please activate the services you
            wish to utilize and empower the users who will sell or oversee those
            services. Let's create a dynamic ecosystem together!
          </p>
          <div className="border rounded p-2 my-4">
            <div className="flex flex-row justify-between items-center border-b pb-2">
              <div className=" flex  flex-row items-center">
                <div className="w-10 h-10 bg-blue rounded-full flex items-center justify-center">
                  <GiDrinking className="text-2xl text-green-500" />
                </div>
                <p className="font font-semibold text-gray-300 ml-2">
                  Bar Services
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <button
                  onClick={handleSubmit}
                  className="py-2 px-4 bg-blue hover:bg-blue/75 text-white font-semibold mx-2 rounded"
                >
                  {isLoading ? "Loading..." : "Activate"}
                </button>
                <button className="py-2 px-4 bg-blue/50 text-white font-semibold mx-2 rounded">
                  Disable
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center border-b pb-2 my-4">
              <div className=" flex  flex-row items-center">
                <div className="w-10 h-10 bg-blue rounded-full flex items-center justify-center">
                  <GiDrinking className="text-2xl text-green-500" />
                </div>
                <p className="font font-semibold text-gray-300 ml-2">
                  Kitchen Services
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <button className="py-2 px-4 bg-blue hover:bg-blue/75 text-white font-semibold mx-2 rounded">
                  Activate
                </button>
                <button className="py-2 px-4 bg-blue/50 text-white font-semibold mx-2 rounded">
                  Disable
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:basis-1/2 md:ml-10 ">
          <div className="fixed border h-screen rounded md:w-[45%] w-[95%] overflow-y-scroll">
            <div className="bg-gray-100  flex flex-row justify-between items-center px-2">
              <h1 className="text-gray-300 font-bold py-4 text-xl px-2">
                Activated Services with assigned users
              </h1>
              <button
                onClick={onOpen}
                className="px-2 py-4 bg-blue rounded text-white hover:bg-blue/75 font-semibold"
              >
                Assign Department
              </button>
            </div>
            <hr />
            <div>
              {!data ? (
                <div className="flex flex-row items-center justify-center">
                  <Spinner />
                </div>
              ) : data?.data.length === 0 ? (
                <div className="flex items-center justify-center mt-10  text-lg text-gray-300">
                  No Service Activated
                </div>
              ) : (
                <div className="flex items-center justify-center mt-10  text-lg text-gray-300">
                  Here they are
                </div>
              )}
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* Model for Registering a user */}
      {ModelAssignDepartment}
    </>
  );
}
