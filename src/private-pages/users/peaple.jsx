/* eslint-disable react/no-children-prop */
import {
  // Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DataTable from "react-data-table-component";

import PeapleImg from "../../assets/images/peaple.png";
import InviteUser from "../../components/user-register";
import { useGetUsersQuery } from "../../redux/api/apiSlice";
import { getUsersSuccess } from "../../redux/slices/usersSlice";

export default function Peaple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const customStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "700", // Change the font size here
      },
    },
    cells: {
      style: {
        fontSize: "13px", // Change the font size here
      },
    },
  };
  const Columms = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
  ];

  const { data, isSuccess, isLoading } = useGetUsersQuery();

  const [records, setRecords] = useState(null);
  const [option, setOption] = useState("name");

  useEffect(() => {
    if (isSuccess && data?.data) {
      setRecords(data.data); // Update the state with the fetched data when it becomes available
    }
  }, [isSuccess, data]);

  console.log(data?.data);
  console.log(records);

  function handleSelect(event) {
    const option = event.target.value;
    setOption(option);
  }

  function handleFilter(event) {
    const newData =
      option === "name"
        ? records.filter((row) =>
            row.name.toLowerCase().includes(event.target.value.toLowerCase())
          )
        : option === "email"
        ? records.filter((row) =>
            row.email.toLowerCase().includes(event.target.value.toLowerCase())
          )
        : records.filter((row) =>
            row.name.toLowerCase().includes(event.target.value.toLowerCase())
          );
    setRecords(newData);
  }

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
  if (!records) {
    // Render loading state or placeholder content while fetching records
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <>
        <div className="flex flex-col md:flex-row items-center  ">
          <div>
            <p className="text-blue font-bold my-6 text-xl">Peaple</p>
            <h1 className="font-bold my-2 text-2xl text-gray-300">
              Manage your work relationships
            </h1>
            <p className="text-gray-300">
              Keep your contacts all together with lightweight CRM capabilities.
              Each person’s contact page automatically organizes all the
              invoices, files, and other documents you’ve shared with them.
            </p>
            <button
              onClick={onOpen}
              className="px-4 py-2 bg-blue rounded mt-6 text-white font-bold"
            >
              Invite Worker
            </button>
          </div>
          <div>
            <img src={PeapleImg} alt="" />
          </div>
        </div>
        {/* Model for Registering a user */}
        {ModelRegister}
      </>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-end mb-8">
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue rounded mt-6 text-white font-bold"
        >
          Invite Worker
        </button>
      </div>
      <div className="my-2">
        <InputGroup>
          <InputLeftAddon children="+234">
            <Select
              border="none"
              defaultValue="row.name"
              onChange={handleSelect}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
            </Select>
          </InputLeftAddon>
          <Input placeholder="Search..." onChange={handleFilter} />
        </InputGroup>
      </div>
      <div className="w-[100%]">
        <div className="overflow-x: auto">
          <DataTable
            columns={Columms}
            data={records}
            fixedHeader
            pagination
            paginationPerPage={8}
            customStyles={customStyles}
          />
        </div>
      </div>

      {/* Model for Registering a user */}
      {ModelRegister}
    </div>
  );
}
