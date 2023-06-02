/* eslint-disable no-unused-vars */
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  MdOutlineMenuOpen,
  MdAutorenew,
  MdOutlineDashboard,
} from "react-icons/md";
import { IoMdBeer } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { TbToolsKitchen2 } from "react-icons/tb";
import { GiPartyPopper } from "react-icons/gi";
import { RiHotelBedFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { CgPlayListAdd } from "react-icons/cg";

export default function Leftbar() {
  const [open, setOpen] = useState(false);

  //   const role = window.localStorage.getItem("role");
  const role = "superadmin";

  const Menus =
    role === "superadmin"
      ? [
          {
            title: "Dashboard",
            src: "/dashboard",
            icon: <MdOutlineDashboard />,
          },
          {
            title: "Organizations",
            src: "/dashboard/organizations",
            icon: <CgPlayListAdd />,
          },
          {
            title: "Messages ",
            src: "/dashboard/messages",
            gap: true,
            icon: <AiFillMessage />,
          },
          {
            title: "Peaple ",
            src: "/dashboard/peaple",
            gap: true,
            icon: <AiFillMessage />,
          },
          {
            title: "Reports",
            src: "/dashboard/reports",
            icon: <IoDocumentTextOutline />,
          },
          {
            title: "Settings",
            src: "/dashboard/settings",
            icon: <FiSettings />,
          },
        ]
      : [
          {
            title: "Dashboard",
            src: "/dashboard",
            icon: <MdOutlineDashboard />,
          },
          { title: "Bar", src: "/dashboard/bar", icon: <IoMdBeer /> },
          {
            title: "Kitchen",
            src: "/dashboard/kitchen",
            gap: true,
            icon: <TbToolsKitchen2 />,
          },
          {
            title: "Rooms ",
            src: "/dashboard/rooms",
            icon: <RiHotelBedFill />,
          },
          {
            title: "Sale & Garden",
            src: "/dashboard/party",
            icon: <GiPartyPopper />,
          },
          {
            title: "Other",
            src: "/dashboard/others",
            icon: <CgPlayListAdd />,
          },
          {
            title: "Messages ",
            src: "/dashboard/messages",
            gap: true,
            icon: <AiFillMessage />,
          },
          {
            title: "Reports",
            src: "/dashboard/reports",
            icon: <IoDocumentTextOutline />,
          },
          {
            title: "Settings",
            src: "/dashboard/settings",
            icon: <FiSettings />,
          },
        ];

  return (
    <div className="mt-20">
      {/* <div className=" bg-blue absolute top-7 ">
        <MdOutlineMenuOpen
          className={`text-2xl text-gray-700 mr-2 cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
      </div> */}
      <div
        className={`bg-blue h-screen md:p-5 pt-8 ${
          open ? "w-72" : "md:w-20 w-0"
        } relative duration-300`}
      >
        <div className="absolute top-7 right-[-44px]">
          <MdOutlineMenuOpen
            className={`text-2xl text-gray-700 mr-2 cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="inline-flex items-center">
          <MdAutorenew
            className={`mr-2 font-medium text-2xl duration-500 text-white ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1 className={`text-white duration-300 ${!open && "scale-0"} `}>
            MS-Apogee
          </h1>
        </div>

        <ul className={`pt-4 ${open ? "block" : "hidden md:block"}`}>
          {Menus.map((menu, index) => (
            <div key={menu.title}>
              <NavLink to={menu.src}>
                <li className=" text-white hover:text-primary text-base flex items-center gap-x-4 cursor-pointer p-2 hover:bg-label-b-light hover:rounded rounded-medium mt-4">
                  <span className="block text-2xl float-left">{menu.icon}</span>
                  <span
                    className={`font-base text-base font-medium flex-1 ${
                      !open && "hidden"
                    } `}
                  >
                    {menu.title}
                  </span>
                </li>
              </NavLink>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
