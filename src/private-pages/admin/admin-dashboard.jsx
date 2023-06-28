import { Spin } from "antd";
import ComingSoon from "../../components/coming-soom";
import { useGetDepartmentsQuery } from "../../redux/api/apiSlice";

export default function ManagerDashboard() {
  const { data, isFetching } = useGetDepartmentsQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <div className="px-[25px] pt-[72px] h-screen">
      <div className="flex justify-center items-center">
        {isFetching ? (
          <div>
            <Spin size="small">
              <div className="content" />
            </Spin>
          </div>
        ) : (
          <div>
            {data?.data && data?.data.length > 0 ? (
              <div>
                {" "}
                <ComingSoon title="Admin Dashboard" />
              </div>
            ) : (
              <div className="dark:text-dark-text-fill">
                No Service activated
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
