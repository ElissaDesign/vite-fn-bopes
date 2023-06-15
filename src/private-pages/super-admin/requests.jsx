/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */

import {
  useGetRequestsQuery,
  useGetRequestQuery,
  useRegisterOrganizationMutation,
} from "../../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

import { errorToast, successToast } from "../../hooks/toast-messages";
import { getRequests } from "../../redux/slices/requestsSlice";
import DataTable from "../../components/data-table";
import { useEffect, useState } from "react";
// import ReusableModal from "../../components/popup-model";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

export default function Requests() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.data);

  const [details, setDetails] = useState();
  const [company, setCompany] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState("12345");
  const [phone, setPhone] = useState();
  // const [requestId, setRequestId] = useState();

  console.log("Details", details);

  const [registerOrganization, { isLoading }] =
    useRegisterOrganizationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("details", company, name);

      const organization = await registerOrganization({
        company,
        name,
        email,
        password,
        phone,
      }).unwrap();
      successToast(organization?.message || "Created");
    } catch (error) {
      console.error("Error", error);
      errorToast(error?.data?.message || "failed");
    }
  };

  const { data } = useGetRequestsQuery();

  useEffect(() => {
    dispatch(getRequests(data?.data));
  }, [data, dispatch]);

  const columns = [
    { Header: "Company", accessor: "company" },
    { Header: "Business Type", accessor: "businessType" },
    { Header: "Email", accessor: "email" },
    { Header: "Name", accessor: "name" },
    { Header: "Address", accessor: "address" },
    { Header: "Website", accessor: "website" },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => (
        <div
          className={
            " items-center" + (requests?.length > 0 ? " flex" : " hidden")
          }
        >
          <Icon
            icon="el:file-edit-alt"
            className="mr-2"
            width="25"
            height="25"
            cursor="pointer"
            color="#148fb6"
          />
          <Icon
            icon="mdi:close-circle-outline"
            width="30"
            height="30"
            cursor="pointer"
            color="#148fb6"
          />

          <div
            onClick={() => {
              setDetails(row.original);
              // handleRequest(row.id);
              setCompany(row.original.company);
              setEmail(row.original.email);
              setPhone(row.original.phone);
              setName(row.original.name);
            }}
          >
            <Icon
              icon="flat-color-icons:view-details"
              width="30"
              height="30"
              cursor="pointer"
              color="#148fb6"
              onClick={onOpen}
            />
          </div>
        </div>
      ),
    },
  ];
  let datum = [];
  if (requests && requests?.length > 0) {
    requests?.map((data, index) => {
      datum[index] = {};
      datum[index].company = data.company;
      datum[index].businessType = data.businessType;
      datum[index].email = data.email;
      datum[index].name = data.name;
      datum[index].address = data.address;
      datum[index].website = data.website;
    });
  }

  return (
    <div className="bg-[#f8f9fc] dark:bg-dark-frame-bg pt-[25px] px-[25px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[#5a5c69] dark:text-dark-text-fill text-[28px] leading-[34px] font-normal cursor-pointer">
          Register Request{" "}
        </h1>
        <button className="bg-[#2e59d9] h-[32px] rounded-[3px] text-white-300 flex items-center justify-center px-[30px] cursor-pointer">
          Generate
        </button>
      </div>

      <div className="mt-[25px] pb-[15px]">
        <DataTable
          data={requests?.length > 0 ? datum : [{}]}
          columns={columns}
          title="Company Register Request list"
        />
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dark:bg-dark-bg">
          <ModalHeader className="dark:text-dark-text-fill text-center border-b-[0.5px] border-primary/75 dark:border-dark-tertiary">
            Request Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="dark:text-dark-text-fill/75 text-dark-tertiary dark:bg-dark-bg text-center font-semibold border-b-[0.5px] border-primary/75 dark:border-dark-tertiary">
              <p className="my-4 text-base ">CompanyName: {details?.company}</p>
              <p className="my-4 text-base ">
                Business Type: {details?.businessType}
              </p>
              <p className="my-4 text-base ">Email: {details?.email}</p>
              <p className="my-4 text-base ">Name: {details?.name}</p>
              <p className="my-4 text-base ">Address: {details?.address}</p>
              <p className="my-4 text-base ">Website: {details?.website}</p>
              <p className="my-4 text-base ">Details: {details?.details}</p>
            </div>

            <div className="flex items-center justify-center my-6">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                variant="ghost"
                onClick={handleSubmit}
                className="dark:text-dark-text-fill/75"
              >
                {isLoading ? <Spinner /> : "Approve"}
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}