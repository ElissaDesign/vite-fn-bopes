/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Select, Spinner } from "@chakra-ui/react";
import { errorToast, successToast } from "../hooks/toast-messages";
import {
  useGetUsersQuery,
  useGetDepartmentsQuery,
  useAssignDepartmentMutation,
} from "../redux/api/apiSlice";
import Button from "./button";

export default function AssignUserDepartment() {
  const [assignDepartment, { isLoading }] = useAssignDepartmentMutation();
  const { data } = useGetUsersQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { currentData } = useGetDepartmentsQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [userId, setUserId] = useState();
  const [departmentId, setDepartmentId] = useState();

  const AssignMember = async (e) => {
    e.preventDefault();

    try {
      const newdata = await assignDepartment({
        userId,
        departmentId,
      }).unwrap();
      console.log("User Assigned:", newdata);
      successToast(newdata?.message || "Assigned");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };

  return (
    <div className=" dark:bg-dark-bg ">
      <div className="w-full mx-auto">
        <div>
          <div className="mb-2">
            <p className="text-gray-800 dark:text-dark-text-fill text-center">
              Every Employee must belong to a department, can also be assigned
              to many departments due to his/her role. <br />
              <span className="font-semibold">eg:</span> Manager can manage all
              departments.
            </p>
          </div>
          <div>
            <p className="text-gray font-semibold text-base pb-2">Employee</p>
            <Select
              placeholder="Select employee"
              defaultValue={userId}
              onBlur={(e) => setUserId(e.target.value)}
              className="dark:bg-dark-bg"
            >
              {data?.data.map((value) => {
                return (
                  <option
                    key={value.id}
                    value={value.id}
                    className="dark:bg-dark-bg hover:dark:bg-dark-bg"
                    aria-required
                  >
                    {value.name}
                  </option>
                );
              })}
            </Select>
            <br />
          </div>

          <div>
            <p className="text-gray font-semibold text-base pb-2">Department</p>
            <Select
              placeholder="Select service"
              defaultValue={departmentId}
              onBlur={(e) => setDepartmentId(e.target.value)}
              aria-required
              className="dark:bg-dark-bg"
            >
              {currentData?.data.map((value) => {
                return (
                  <option
                    key={value.id}
                    value={value.id}
                    className="dark:bg-dark-bg hover:dark:bg-dark-bg"
                  >
                    {value.name}
                  </option>
                );
              })}
            </Select>
            <br />
          </div>

          <Button
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-8 text-xl font-medium w-full"
            onClick={AssignMember}
            disabled={
              userId === undefined && departmentId === undefined ? true : false
            }
          >
            {isLoading ? <Spinner /> : "Assign"}
          </Button>
        </div>
      </div>
    </div>
  );
}
