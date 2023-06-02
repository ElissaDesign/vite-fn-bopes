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
  // if(isLoading){
  //   return <div>Loading...</div>
  // }
  return (
    <>
      <CheckRole roles={["superadmin"]}>
        <SupAdDashboard />
      </CheckRole>
      <CheckRole roles={["admin"]}>
        <AdminDashboard />
      </CheckRole>
      <CheckRole roles={["manager"]}>
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
}
