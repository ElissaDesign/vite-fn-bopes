import CheckRole from "../hooks/check-roles";
import SupAdDashboard from "../private-pages/super-admin/super-dashboard";
import AdminDashboard from "../private-pages/admin/admin-dashboard";
import ManagerDashboard from "../private-pages/manager/manager-dashboard";
import ExpireDashboard from "./token-expired";
import AccountantDashboard from "./accountant/accountant-dashboard";
import EmployeeDashboard from "./employee/employee-dashboard";

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
      <CheckRole roles={["accountant"]}>
        <AccountantDashboard />
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
