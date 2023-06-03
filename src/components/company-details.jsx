/* eslint-disable react/jsx-key */
import { useState } from "react";
import {
  useGetOrganizationsQuery,
  useAssignOrganizationMutation,
  useGetUsersWithNoOrgQuery,
} from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";
import { Select, Spinner } from "@chakra-ui/react";

export default function Details() {
  const [orgId, setOrgId] = useState();
  const [userId, setUserId] = useState();

  console.log("userId:", userId, "OrgId", orgId);

  const organization = useGetOrganizationsQuery();

  const [assignOrganization, { isLoading }] = useAssignOrganizationMutation();
  const { data } = useGetUsersWithNoOrgQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const organization = await assignOrganization({
        userId,
        orgId,
      });
      successToast(organization?.data?.message);
    } catch (error) {
      console.log(error);
      errorToast(error?.data?.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4">
        <h1 className=" text-xl font-bold text-gray-300">Assign the Admin</h1>
      </div>
      <div className="flex flex-col ">
        {/* User */}
        <div className="w-full my-6">
          <label className="font-bold text-gray-300 my-4 text-base">
            Select name:
          </label>
          <Select
            placeholder="Select name"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
            className="w-full p-1 px-2 text-gray-300 outline-none font-light"
          >
            {data?.data.map((value) => {
              return <option value={value.id}>{value.name}</option>;
            })}
          </Select>
        </div>
        {/* Company */}

        <div className="w-full my-4">
          <label className="font-bold text-gray-300 my-4 text-base">
            Select Company:
          </label>
          <Select
            placeholder="Select Company"
            onChange={(e) => setOrgId(e.target.value)}
            value={orgId}
            className="w-full p-1 px-2 text-gray-300 outline-none font-light"
          >
            {organization?.data?.organizations.map((value) => {
              return <option value={value.id}>{value.name}</option>;
            })}
          </Select>
        </div>
        <div className="w-full my-4 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="py-2 px-4 rounded bg-blue text-white"
          >
            {isLoading ? <Spinner /> : "Assign Company"}
          </button>
        </div>
      </div>
    </div>
  );
}
