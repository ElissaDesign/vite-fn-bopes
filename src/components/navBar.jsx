import { useEffect, useState } from "react";
import Logo from "../assets/Bopes.svg";
import Lock from "../assets/images/lock.svg";
import Close from "../assets/images/close.svg";
import HamburgerMenu from "../assets/images/hamburgerMenu.svg";
import { themeContext } from "../hooks/theme-context";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Tooltip from "./tooltip";

const Navbar = () => {
  const [colorTheme, setTheme] = themeContext();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  const [togglei, setTogglei] = useState(false);
  useEffect(() => {}, [togglei]);

  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

  return (
    <div className="w-full dark:bg-dark-bg bg-white h-[80px] dark:border-b-[0.5px] dark:border-gray-100 shadow-md fixed bg-opacity-95 z-10 ">
      <div className="md:max-w-[85%] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <img src={Logo} alt="My logo" />

        <div className="hidden md:flex items-center dark:text-dark-text-fill">
          <ul className="flex gap-4">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about" to="/about">
                About
              </a>
            </li>
            <li>Support</li>
            <li>Platform</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div className="hidden md:flex">
          <button className="flex justify-between items-center bg-transparent px-6 gap-2 dark:text-dark-text-fill">
            <Tooltip message="DarkMode">
              <div className="ml-2">
                <DarkModeSwitch
                  checked={darkSide}
                  onChange={toggleDarkMode}
                  size={25}
                />
              </div>
            </Tooltip>
          </button>
          <button className="flex justify-between items-center bg-transparent px-6 gap-2 dark:text-dark-text-fill">
            <img src={Lock} alt="Lock" width={25} height={25} />
            <a href="/auth/login">Login</a>
          </button>
          <button className="px-8 py-3 rounded-md bg-[#3359DF] text-white font-bold">
            <a href="/auth/register">Free trial</a>
          </button>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          <img
            src={toggle ? `${Close}` : `${HamburgerMenu}`}
            alt="Menu"
            width={25}
            height={25}
            className="dark:text-dark-text-fill"
          />
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4 dark:bg-dark-bg dark:text-dark-text-fill bg-white w-full px-8 md:hidden border-b ease-in-out duration-500"
            : "fixed top-[-100%]"
        }>
        <ul>
          <li className="p-4 hover:bg-gray-100 hover:dark:bg-dark-frame-bg">
            <a href="/">Home</a>
          </li>
          <li className="p-4 hover:bg-gray-100 hover:dark:bg-dark-frame-bg">
            <a href="/about">About</a>
          </li>
          <li className="p-4 hover:bg-gray-100 hover:dark:bg-dark-frame-bg">
            Support
          </li>
          <li className="p-4 hover:bg-gray-100 hover:dark:bg-dark-frame-bg">
            Platform
          </li>
          <li className="p-4 hover:bg-gray-100 hover:dark:bg-dark-frame-bg">
            Pricing
          </li>
          <div className="flex flex-col my-4 gap-4">
            <button className="border border-[20B486] flex justify-center items-center bg-transparent px-6 gap-2 py-4">
              <Tooltip message="DarkMode">
                <div className="ml-2">
                  <DarkModeSwitch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    size={30}
                  />
                </div>
              </Tooltip>
            </button>
            <button className="border border-[20B486] flex justify-center items-center bg-transparent px-6 gap-2 py-4">
              <img src={Lock} alt="Lock" width={25} height={25} />
              <a href="/auth/login">Login</a>
            </button>
            <button className="px-8 py-5 rounded-md bg-[#3359DF] text-white font-bold">
              <a href="/auth/register">Free trial</a>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
