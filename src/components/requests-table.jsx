/* eslint-disable react/no-children-prop */
import DataTable from "react-data-table-component";
import {
  InputGroup,
  InputLeftAddon,
  Select,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { useGetRequestsQuery } from "../redux/api/apiSlice";
import { useEffect, useState } from "react";

export default function RequestsTable() {
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
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Business Type",
      selector: (row) => row.businessType,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Website",
      selector: (row) => row.website,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
  ];

  const { data, isSuccess } = useGetRequestsQuery();

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

  if (!records) {
    // Render loading state or placeholder content while fetching records
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full md:w-[95%] mx-auto">
      <div className="my-2 -z-100">
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
  );
}
