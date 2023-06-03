import CheckRole from "../hooks/check-roles";
import SupAdDashboard from "./super-dashboard";
import AdminDashboard from "./admin-dashboard";
import ManagerDashboard from "./manager-dashboard";
import EmployeeDashboard from "./employee-dasboard";
import ExpireDashboard from "./token-expired";
// import AccountantDashboard from "./accountantDashboard";
// import EmployeeDashboard from "./employeeDashboard";

export default function Dashboard() {
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
