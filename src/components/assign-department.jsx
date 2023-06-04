/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Button, Select, Spinner } from "@chakra-ui/react";
import { errorToast, successToast } from "../hooks/toast-messages";
import {
  useGetUsersQuery,
  useGetDepartmentsQuery,
  useAssignDepartmentMutation,
} from "../redux/api/apiSlice";

export default function AssignUserDepartment() {
  const [assignDepartment, { isLoading }] = useAssignDepartmentMutation();
  const { data } = useGetUsersQuery();
  const { currentData } = useGetDepartmentsQuery();

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
    <div className="">
      <div className="w-full mx-auto">
        <div>
          <div className="mb-2">
            <p className="text-gray-300">
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
            >
              {data?.data.map((value) => {
                return (
                  <option key={value.id} value={value.id}>
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
            >
              {currentData?.data.map((value) => {
                return (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                );
              })}
            </Select>
            <br />
          </div>

          <Button
            colorScheme="facebook"
            className="mt-2 w-full py-4"
            onClick={AssignMember}
          >
            {isLoading ? <Spinner /> : "Assign"}
          </Button>
        </div>
      </div>
    </div>
  );
}
