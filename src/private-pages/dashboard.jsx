import CurrentUser from "../hooks/current-user";
import { RequireAuth } from "../hooks/require-auth";

export const Dashboard = () => {
  const result = CurrentUser();
  console.log(result);

  RequireAuth();
  return <div>Dashboard</div>;
};
