/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../components/data-table";
import { Icon } from "@iconify/react";
import { useGetOrganizationOwnedQuery } from "../../redux/api/apiSlice";
import { getCustomers } from "../../redux/slices/customersSlice";

export default function Customers() {
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customers?.data);

  const { data, isLoading } = useGetOrganizationOwnedQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    dispatch(getCustomers(data?.organizations));
  }, [data, dispatch]);

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
          />
          <Icon
            icon="mdi:close-circle-outline"
            width="30"
            height="30"
            cursor="pointer"
            color="#148fb6"
          />

          <Icon
            icon="flat-color-icons:view-details"
            width="30"
            height="30"
            cursor="pointer"
            color="#148fb6"
          />
        </div>
      ),
    },
  ];
  let datum = [];
  if (customers && customers.length > 0) {
    customers.map((data, index) => {
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
        {datum?.length !== 0 ? (
          <DataTable data={datum} columns={columns} title="Customers List" />
        ) : (
          <div className="text-center mt-48 text-lg uppercase">
            <p> No customer list found</p>
          </div>
        )}
      </div>
    </div>
  );
}
