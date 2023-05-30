import CheckRole from "../hooks/check-roles";
import SupAdDashboard from "./super-dashboard";
import AdminDashboard from "./admin-dashboard";
import ManagerDashboard from "./manager-dashboard";
import EmployeeDashboard from "./employee-dasboard";
import ExpireDashboard from "./token-expired";
// import AccountantDashboard from "./accountantDashboard";
// import EmployeeDashboard from "./employeeDashboard";
import { useCurrentUserQuery } from "../redux/api/apiSlice";
import Startup from "./startup";

export default function Dashboard() {
  const { data, isSuccess, isError, isLoading } = useCurrentUserQuery();
  // if(isLoading){
  //   return <div>Loading...</div>
  // }
  if (isSuccess && data?.currentUser.organizationId) {
    return (
      <>
        <CheckRole roles={["superadmin"]}>
          <SupAdDashboard />
        </CheckRole>
        <CheckRole roles={["boss"]}>
          <AdminDashboard />
        </CheckRole>
        <CheckRole roles={["admin"]}>
          <ManagerDashboard />
        </CheckRole>
        <CheckRole roles={["user"]}>
          <EmployeeDashboard />
        </CheckRole>
        <CheckRole>
          <ExpireDashboard />
        </CheckRole>
      </>
    );
  } else if (isSuccess && !data?.currentUser.organizationId) return <Startup />;
}
