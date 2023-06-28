/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import DataTable from "../../components/data-table";
import { Icon } from "@iconify/react";
import { useGetOrganizationOwnedQuery } from "../../redux/api/apiSlice";

export default function Customers() {
  const { data, isLoading } = useGetOrganizationOwnedQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  console.log("Organization", data);

  const columns = [
    { Header: "Company Name", accessor: "OrganizationName" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => (
        <div
          className={
            " items-center" +
            (data?.organizations.length > 0 ? " flex" : " hidden")
          }
        >
          <Icon
            icon="el:file-edit-alt"
            className="mr-2"
            width="25"
            height="25"
            cursor="pointer"
            color="#148fb6"
            /* istanbul ignore next */
            // onClick={() => {
            //   setSelectedOptionUpdate({
            //     value: row.original.cohort,
            //     label: row.original.cohort,
            //   });
            //   setSelectedTeamOptionUpdate({
            //     value: row.original.team,
            //     label: row.original.team,
            //   });
            //   console.log(selectedOption2);
            //   console.log(row.original.team);
            //   removeEditModel();
            //   setEditEmail(row.original.email);
            //   setEditCohort(row.original.cohort);
            //   setEditTeam(row.original.team);
            // }}
          />
          <Icon
            icon="mdi:close-circle-outline"
            width="30"
            height="30"
            cursor="pointer"
            color="#148fb6"
            /* istanbul ignore next */
            // onClick={() => {
            //   removeTraineeMod();
            //   setDeleteEmail(row.original.email);
            //   setDeleteFromCohort(row.original.team);
            // }}
          />

          <Icon
            icon="flat-color-icons:view-details"
            width="30"
            height="30"
            cursor="pointer"
            color="#148fb6"
            // onClick={() => handleClickOpen(row.original.email)}
          />
        </div>
      ),
    },
  ];
  let datum = [];
  if (data?.organizations && data?.organizations.length > 0) {
    data?.organizations.map((data, index) => {
      datum[index] = {};
      datum[index].OrganizationName = data.OrganizationName;
      datum[index].name = data.name;
      datum[index].email = data.email;
      datum[index].phone = data.phone;
    });
  }
  return (
    <div className="bg-[#f8f9fc] dark:bg-dark-frame-bg h-screen px-[25px] pt-[72px] ">
      <div className="flex items-center justify-between">
        <h1 className="text-[#5a5c69] dark:text-dark-text-fill text-[28px] leading-[34px] font-normal cursor-pointer">
          Customers
        </h1>
        <button className="bg-[#2e59d9] h-[32px] rounded-[3px] text-white flex items-center justify-center px-[30px] cursor-pointer">
          Generate
        </button>
      </div>

      <div className="mt-[25px] pb-[15px]">
        <DataTable
          data={data?.organizations.length > 0 ? datum : [{}]}
          columns={columns}
          title="Customers List"
        />
      </div>
    </div>
  );
}
