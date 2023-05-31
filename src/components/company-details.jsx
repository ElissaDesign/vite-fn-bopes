/* eslint-disable react/jsx-key */
import { useState } from "react";
import {
  useCreateOrganizationMutation,
  useGetOrganizationQuery,
  useGetOrganizationsQuery,
  useUpdateOrganizationMutation,
  useAssignOrganizationMutation,
  useCurrentUserQuery,
} from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";
import { Spinner } from "@chakra-ui/react";
import { data } from "autoprefixer";

export default function Details() {
  const [orgId, setOrgId] = useState();
  const [userId, setUserId] = useState();

  console.log("userId:", userId, "OrgId", orgId);
  const currentUser = useCurrentUserQuery();

  const organization = useGetOrganizationsQuery();

  const [assignOrganization, { isLoading }] = useAssignOrganizationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserId(currentUser?.data?.currentUser.id);
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
        <h1 className=" text-xl font-bold text-gray-300">About you</h1>
        <p className="text-sm font-light my-2">
          We’ll use this info to personalize your experience
        </p>
      </div>
      <div className="flex flex-col ">
        <div className="border-b border-[#7B7B7B] w-full my-8">
          <select
            name="experience"
            onChange={(e) => setOrgId(e.target.value)}
            value={orgId}
            className="w-full p-1 px-2 text-gray-300 outline-none font-light"
          >
            {organization?.data?.organizations.map((value) => {
              return <option value={value.id}>{value.name}</option>;
            })}
          </select>
        </div>
        <div className="border-b border-gray-200 w-full my-8">
          <button
            onClick={handleSubmit}
            className="py-2 px-4 rounded bg-blue text-white"
          >
            {isLoading ? <Spinner /> : "Own your Company"}
          </button>
        </div>
      </div>
    </div>
  );
}
