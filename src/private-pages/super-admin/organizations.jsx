import { useState } from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { useCreateOrganizationMutation } from "../../redux/api/apiSlice";
import {
  Modal,
  ModalBody,
  Button,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { errorToast, successToast } from "../../hooks/toast-messages";
import Details from "../../components/company-details";
import InviteUser from "../../components/user-register";

export default function RegistrationRequests() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [createOrganization, { isLoading }] = useCreateOrganizationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const organization = await createOrganization({ name }).unwrap();
      successToast(organization?.message || "Created");
    } catch (error) {
      errorToast(error?.data?.message || "failed");
    }
  };
  // invite member in the organization
  const ModelRegister = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">Invite a member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InviteUser />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  return (
    <>
      <div className="flex flex-col md:flex-row justify-betwwen border p-10 items-center rounded shadow">
        <div className="w-full md:basis-1/2 md:px-10">
          <div className="flex flex-col justify-center items-center">
            <h1 className=" text-xl font-bold text-gray-300">
              Create a company
            </h1>
          </div>

          <div className="w-full flex items-center justify-between my-10">
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
            <button
              onClick={handleSubmit}
              className="py-2 px-4 text-white bg-blue rounded mx-6 font-semibold"
            >
              {isLoading ? <Spinner /> : "Create"}
            </button>
          </div>
          <hr className="md:hidden my-8" />
          <Button onClick={onOpen} className="w-full">
            Register Admin
          </Button>
        </div>

        <div className="w-full md:basis-1/2 md:px-10">
          <hr className="md:hidden my-8" />

          <Details />
        </div>
      </div>

      <div>
        {/* Model for Registering a user */}
        {ModelRegister}
      </div>

      <div>{/* Table of the admins with their companys */}</div>
    </>
  );
}
