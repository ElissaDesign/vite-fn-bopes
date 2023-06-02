import { useStepperContext } from "../../context/stepper-context";
import { BiUser, BiLock } from "react-icons/bi";

export default function Account() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-xl font-bold text-gray">Let’s get started</h1>
        <p className="text-sm font-light my-2">
          First you will need to set up your account.
        </p>
        <input
          type="text"
          name="email"
          defaultValue="abctesting@gmail.com"
          disabled
          className="w-full appearance-none p-1 px-2 py-2 outline-none border border-[#D9D9D9] rounded my-4 bg-[#D9D9D9] font-light"
        />
      </div>
      <div className="flex flex-col ">
        <div className="mx-2 w-full flex-1">
          <div className="my-2 flex items-center border-b border-[#D9D9D9] bg-white p-1">
            <BiUser />
            <input
              onChange={handleChange}
              value={userData["username"] || ""}
              name="username"
              placeholder="Your name"
              className="w-full appearance-none p-1 px-2 text-gray-300 outline-none font-light"
            />
          </div>
        </div>
        <div className="mx-2 w-full flex-1">
          <div className="my-2 flex items-center border-b border-gray-100 bg-white p-1">
            <BiLock />
            <input
              onChange={handleChange}
              value={userData["password"] || ""}
              name="password"
              placeholder="Password"
              type="password"
              className="w-full appearance-none p-1 px-2 text-gray-300 outline-none font-light"
            />
          </div>
        </div>

        <div className="mx-2 w-full flex-1">
          <div className="my-2 flex items-center bg-white p-1 W-10 ">
            <div className="border-b border-gray-100 w-1/5 mr-2">
              <select
                name="code"
                onChange={handleChange}
                value={userData["code"] || ""}
                className="w-full p-1 px-2 text-gray-300 outline-none font-light"
              >
                <option value="+250">+250</option>
                <option value="+457">+457</option>
              </select>
            </div>
            <div className="border-b border-gray-200 w-full flex-1">
              <input
                onChange={handleChange}
                value={userData["contact"] || ""}
                name="contact"
                placeholder="Phone number"
                type="phone"
                className="w-full appearance-none p-1 px-2 text-gray-300 outline-none font-light"
              />
            </div>
          </div>
          <p className="text-xs font-light text-gray-300">
            This may be used to contact you if you need an assistance
          </p>
        </div>
      </div>
    </div>
  );
}
