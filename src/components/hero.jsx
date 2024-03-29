import { AiOutlineSearch } from "react-icons/ai";
import Typed from "react-typed";
import HeroImg from "../assets/images/heroImg.png";

export default function Hero() {
  return (
    <div className="w-full h-screen dark:bg-dark-bg bg-white pt-24">
      <div className="md:max-w-[85%] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0">
        <div className="flex flex-col justify-start gap-4">
          <p className="py-2 text-2xl text-[#20B486] font-bold">
            START TO SUCCESS
          </p>
          <h1 className=" dark:text-dark-text-fill md:leading-[68px] py-2 md:text-5xl text-4xl font-semibold">
            Streamline Your Business Operations with our All-in-One Control
            System:{" "}
            <span className="text-[#20B486]">
              <Typed
                strings={[
                  "Bars",
                  "Rooms",
                  "Sales",
                  "Gardens",
                  "Restaurant",
                  "and More!",
                ]}
                typeSpeed={120}
                backSpeed={140}
                loop
              />
            </span>
          </h1>
          <p className="py-2 text-lg text-gray-600">
            Various versions have evolved over the years, sometimes by accident.
          </p>
        </div>
        <img
          src={HeroImg}
          alt="hero image"
          className="md:order-last  order-first"
        />
      </div>
    </div>
  );
}
