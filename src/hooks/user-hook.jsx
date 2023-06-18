import { useGetAllDepartmentsUserHaveQuery } from "../redux/api/apiSlice";

const UserHook = () => {
  const { data } = useGetAllDepartmentsUserHaveQuery();
  if (data?.data) {
    const departments = data?.data.map(({ id, name }) => ({ id, name }));
    localStorage.setItem("departments", JSON.stringify(departments));
  }
};

export default UserHook;
