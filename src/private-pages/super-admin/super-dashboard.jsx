/* eslint-disable no-unused-vars */
import { FaEllipsisV, FaRegCalendarMinus } from "react-icons/fa";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Progress } from "antd";
import notfound from "../../assets/images/notfound.svg";
import PieComponent from "../../components/pie-charts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
// bg-[#f8f9fc] dark:bg-dark-frame-bg pt-[25px] px-[25px] flex flex-col grow
export default function SuperDashboard() {
  return (
    <div className=" bg-light-bg dark:bg-dark-frame-bg h-full px-[25px] pt-[72px]">
      <div className="flex flex-row pb-8 justify-center">
        <div className="lg:ml-44 w-[90%] pt-[4vh] lg:pt-[6vh]">
          <div className="flex items-center justify-between">
            <h1 className="text-[#5a5c69] dark:text-dark-text-fill text-[28px] leading-[34px] font-normal cursor-pointer">
              Dashboard
            </h1>
            <button className="bg-[#2e59d9] h-[32px] rounded-[3px] text-white-300 flex items-center justify-center px-[30px] cursor-pointer">
              Generate
            </button>
          </div>

          <div className="grid grid-flow-col-2 lg:grid-cols-4 gap-[30px] mt-[25px] pb-[15px] ">
            <div className="h-[100px] rounded-[8px] bg-white dark:bg-dark-bg  border-l-[4px] border-[#2e59d9] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
              <div>
                <h2 className="text-[#b589df] text-[11px] leading-[17px] font-bold">
                  EARNINGS(MONTHLY)
                </h2>
                <h1 className="text-[20px] dark:text-dark-text-fill/75 leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  $40,0000
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white dark:bg-dark-bg border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
              <div>
                <h2 className="text-[#1CC88A] text-[11px] leading-[17px] font-bold">
                  EARNINGS(ANNUAL)
                </h2>
                <h1 className="text-[20px] dark:text-dark-text-fill/75 leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  $240,0000
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white dark:bg-dark-bg border-l-[4px] border-[#2e59d9] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
              <div>
                <h2 className="text-[#1CC88A] text-[11px] leading-[17px] font-bold">
                  TASKS(MONTHLY)
                </h2>
                <h1 className="text-[20px] dark:text-dark-text-fill/75 leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  $40,0000
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white dark:bg-dark-bg border-l-[4px] border-[#2e59d9] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
              <div>
                <h2 className="text-[#b589df] text-[11px] leading-[17px] font-bold">
                  PENDING REQUESTS
                </h2>
                <h1 className="text-[20px] dark:text-dark-text-fill/75 leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  $40,0000
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row mt-[22px] w-full gap-[30px] ">
            <div className="basis-[100%] lg:basis-[70%] border bg-white dark:bg-dark-bg md:shadow cursor-pointer rounded-[4px]">
              <div className="bg-[#f8f9fc] dark:bg-dark-bg flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] dark:border-b-[0.4px] dark:border-[#ededed]/10 mb-[20px]">
                <h2>Earnings Overview</h2>
                <FaEllipsisV color="gray" className="cursor-pointer" />
              </div>
              <div className="">
                <LineChart
                  // className="w-full"
                  width={600}
                  height={450}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </div>
            </div>
            <div className="basis-[100%] lg:basis-[30%] border bg-white dark:bg-dark-bg shadow-md cursor-pointer rounded-[4px]">
              <div className="bg-[#f8f9fc] dark:bg-dark-bg flex items-center justify-between py-[15px] px-[20px] border-b-[1px] dark:border-b-[0.4px] dark:border-[#ededed]/10 border-[#ededed] mb-[20px]">
                <h2>Services Overview</h2>
                <FaEllipsisV color="gray" className="cursor-pointer" />
              </div>
              <div className="pl-[35px]">
                <PieComponent />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row mt-[22px]  w-full gap-[30px]">
            <div className="basis-[100%] lg:basis-[55%] border bg-white dark:bg-dark-bg shadow-md cursor-pointer rounded-[4px]">
              <div className="bg-[#f8f9fc] dark:bg-dark-bg flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
                <h2 className="text-[#2e59d9] font-bold text-[16px] leading-[19px]">
                  Services Overview
                </h2>
                <FaEllipsisV color="gray" className="cursor-pointer" />
              </div>
              <div className="px-[25px] space-y-[15px] py-[15px] dark:text-dark-text-fill">
                <div>
                  <h2>Bar Service</h2>
                  <Progress percent={30} strokeColor="#e74a3b" />
                </div>
                <div>
                  <h2>Kitchen/Restorant Service</h2>
                  <Progress
                    percent={50}
                    status="active"
                    strokeColor="#f6c23e"
                  />
                </div>
                <div>
                  <h2>Rooms Service</h2>
                  <Progress
                    percent={70}
                    status="active"
                    strokeColor="#4e73df"
                  />
                </div>
                <div>
                  <h2>Rooms Service</h2>
                  <Progress
                    percent={100}
                    status="active"
                    strokeColor="#36b9cc"
                  />
                </div>
                <div>
                  <h2>Rooms Service</h2>
                  <Progress
                    percent={50}
                    status="exception"
                    strokeColor="#1cc88a"
                  />
                </div>
              </div>
            </div>
            <div className="basis-[100%] lg:basis-[45%] dark:bg-dark-bg border bg-white shadow-md cursor-pointer rounded-[4px">
              <div className="bg-[#f8f9fc] dark:bg-dark-bg flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
                <h2 className="text-[#2e59d9] font-bold text-[16px] leading-[19px]">
                  Services Overview
                </h2>
                <FaEllipsisV color="gray" className="cursor-pointer" />
              </div>
              <div className="pl-[35px] flex items-center justify-center h-[100%]">
                <div>
                  <img src={notfound} width={200} alt="" />
                  <p>No data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
