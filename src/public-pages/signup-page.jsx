/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
import { useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  InputLeftAddon,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import { TiPointOfInterest } from "react-icons/ti";
import { errorToast, successToast } from "../hooks/toast-messages";
import {
  useCreateRequestMutation,
  useUserRegisterMutation,
} from "../redux/api/apiSlice";
import Navbar from "../components/navBar";
import Button from "../components/button";
import {
  BsFillBuildingsFill,
  BsFillEnvelopeAtFill,
  BsFillPinMapFill,
  BsTelephoneFill,
} from "react-icons/bs";
import AnalyisImage from "../assets/undraw_real_time_analytics_re_yliv.svg";
import { Icon } from "@iconify/react";

const Register = () => {
  // const [createRequest, { isLoading }] = useCreateRequestMutation();
  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const [company, setCompany] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const [firstname, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAdress] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRegister = await userRegister({
        firstname,
        email,
        phone,
        address,
        password,
      }).unwrap();
      console.log(newRegister);
      successToast(newRegister?.message || "Sent");
    } catch (error) {
      console.log(error);
      errorToast(error?.data.message || "Not sent, ");
    }
  };

  return (
    // <div className="h-[100%] dark:bg-dark-bg ">
    //   <Navbar />

    //   <div className="dark:bg-dark-bg dark:text-dark-text-fill md:w-[80%] w-[90%] mx-auto">
    //     <div className="mt-20 px-6 pt-[20px] dark:bg-dark-bg">
    //       <h1 className="font-bold text-2xl my-4 text-center">
    //         Welcome to our web app system!{" "}
    //       </h1>
    //       <p>
    //         We are excited to have you on board. To get started and gain access
    //         to your company's account, we kindly ask you to fill out the
    //         following information. This will enable our super admin to create
    //         your company profile in our system and grant you control over all
    //         your business activities.
    //       </p>
    //       <h1 className="font-bold text-xl my-4 text-gray-800">
    //         Please provide the following details:
    //       </h1>

    //       <div className="border rounded p-4">
    //         <form onSubmit={onSubmit}>
    //           <div className="">
    //             <p className="text-gray-700 dark:text-dark-text-fill my-2">
    //               {" "}
    //               Enter your company's official name
    //             </p>
    //             <InputGroup>
    //               <InputLeftElement pointerEvents="none">
    //                 <BsFillBuildingsFill color="gray.300" />
    //               </InputLeftElement>
    //               <Input
    //                 type="text"
    //                 placeholder="Company name"
    //                 value={company}
    //                 required
    //                 onChange={(e) => setCompany(e.target.value)}
    //               />
    //             </InputGroup>
    //           </div>
    //           <div className="mt-2">
    //             <p className="text-gray-700 dark:text-dark-text-fill my-2">
    //               {" "}
    //               Specify the nature of your business (e.g., retail, technology,
    //               consulting).
    //             </p>
    //             <Input
    //               type="text"
    //               placeholder="Business Type"
    //               required
    //               value={businessType}
    //               onChange={(e) => setBusinessType(e.target.value)}
    //             />
    //           </div>
    //           <div>
    //             <p className="text-gray-700 dark:text-dark-text-fill my-2">
    //               {" "}
    //               Enter the full name of the owner or authorized representative.
    //             </p>
    //             <Input
    //               type="text"
    //               className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
    //               placeholder="Your full Name"
    //               required
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //             />
    //           </div>
    //           <div>
    //             <p className="text-gray-700 dark:text-dark-text-fill my-2">
    //               Provide the email address of the owner or authorized
    //               representative
    //             </p>
    //             <InputGroup>
    //               <InputLeftElement pointerEvents="none">
    //                 <BsFillEnvelopeAtFill color="gray.300" />
    //               </InputLeftElement>
    //               <Input
    //                 type="email"
    //                 placeholder="Your Email"
    //                 required
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //             </InputGroup>
    //           </div>

    //           <div>
    //             <p className="text-gray-700 dark:text-dark-text-fill my-2">
    //               {" "}
    //               Enter the primary contact number for your company.
    //             </p>
    //             <InputGroup>
    //               <InputLeftElement pointerEvents="none">
    //                 <BsTelephoneFill color="gray.300" />
    //               </InputLeftElement>
    //               <Input
    //                 type="tel"
    //                 placeholder="Phone number"
    //                 required
    //                 value={phone}
    //                 onChange={(e) => setPhone(e.target.value)}
    //               />
    //             </InputGroup>
    //           </div>

    //           <div>
    //             <p className="text-gray-700 dark:text-dark-text-fill my-2">
    //               Specify the physical address of your company's headquarters.
    //             </p>
    //             <InputGroup>
    //               <InputLeftElement pointerEvents="none">
    //                 <BsFillPinMapFill color="gray.300" />
    //               </InputLeftElement>
    //               <Input
    //                 type="text"
    //                 placeholder="Company Address"
    //                 required
    //                 value={address}
    //                 onChange={(e) => setAdress(e.target.value)}
    //               />
    //             </InputGroup>
    //           </div>

    //           <div>
    //             <p className="text-gray-700 dark:text-dark-text-fill my-2">
    //               If applicable, provide the URL of your company's website.
    //             </p>

    //             <InputGroup>
    //               <InputLeftAddon
    //                 children="https://"
    //                 className="dark:text-gray-700"
    //               />
    //               <Input
    //                 type="text"
    //                 placeholder="Website (optional)"
    //                 value={website}
    //                 onChange={(e) => setWebsite(e.target.value)}
    //               />
    //               <InputRightAddon
    //                 children=".com"
    //                 className="dark:text-gray-700"
    //               />
    //             </InputGroup>
    //           </div>
    //           <div className="my-4">
    //             <p className="text-gray-700 dark:text-dark-text-fill my-2">
    //               Please provide a brief description of your company and its
    //               core activities (limit: 100 words).
    //             </p>
    //             <Textarea
    //               type="text"
    //               required
    //               value={description}
    //               onChange={(e) => setDescription(e.target.value)}
    //               placeholder="Brief Description"
    //             />
    //           </div>

    //           <Button
    //             style="text-xl w-full text-sm flex items-center justify-center"
    //             size="sm"
    //             type="submit"
    //           >
    //             {isLoading ? <Spinner /> : `Request`}
    //           </Button>
    //         </form>
    //       </div>
    //     </div>
    //     <div className="mt-20 px-8">
    //       <h1 className="mt-4  font-bold">Terms and Conditions</h1>
    //       <p className="my-2">
    //         By submitting this registration request, you agree to the following
    //         terms and conditions:
    //       </p>
    //       <div className="flex flex-row items-center border-t mt-4">
    //         <TiPointOfInterest className="bg-white rounded text-blue mr-2" />
    //         <p className=" my-2">
    //           You acknowledge that the provided information is accurate and up
    //           to date.
    //         </p>
    //       </div>
    //       <div className="flex flex-row items-center">
    //         <TiPointOfInterest className="bg-white rounded text-blue mr-2" />
    //         <p className=" my-2">
    //           You understand that the owner or authorized representative will
    //           have administrative control over the company's account.
    //         </p>
    //       </div>
    //       <div className="flex flex-row items-center">
    //         <TiPointOfInterest className="bg-white rounded text-blue mr-2" />
    //         <p className=" my-2">
    //           You accept responsibility for all activities carried out under
    //           your company's account
    //         </p>
    //       </div>
    //       <div className="flex flex-row items-center">
    //         <TiPointOfInterest className="bg-white rounded text-blue mr-2" />
    //         <p className=" my-2">
    //           You agree to comply with our platform's terms of service and
    //           privacy policy.
    //         </p>
    //       </div>
    //       <p className="my-4">
    //         Please note that the completion of this registration form does not
    //         guarantee immediate access. Our super admin will review your request
    //         and create your company profile accordingly. Once your company is
    //         registered, you will receive an email notification containing your
    //         login credentials and instructions on how to access and manage your
    //         account.
    //       </p>
    //       <p className="my-4">
    //         Thank you for choosing our web app system. We look forward to
    //         supporting your business operations and helping you thrive in the
    //         digital landscape. If you have any questions or require further
    //         assistance, please don't hesitate to contact our support team at
    //         [support@email.com].
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div className="dark:bg-dark-bg h-screen overflow-x-hidden ">
      <Navbar />
      <div className="flex flex-col md:flex-row mt-32 md:pl-[8%] overflow-x-hidden">
        <div className="basis-full w-[90%] md:w-full mx-auto md:basis-[40%] mb-10 md:mb-0">
          <div className="flex items-center gap-3">
            <Icon icon="logos:google-analytics" />
            <h1 className="text-gray-600 font-semibold text-lg">Data Flow</h1>
          </div>
          <p>Analyze real-time data for decision making</p>
          <div>
            <form
              class="space-y-6"
              action="#"
              method="POST"
              className="mt-6"
              onSubmit={onSubmit}>
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Your name
                </label>
                <div class="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autocomplete="name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autocomplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  for="address"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Your Address
                </label>
                <div class="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="address"
                    placeholder="Your address"
                    autocomplete="address"
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Phone number
                </label>
                <div class="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    placeholder="Your contact"
                    autocomplete="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 border-gray-100 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none "
                  />
                </div>
                <div class="text-sm text-right my-2">
                  <a
                    href="/forgot-password"
                    class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {isLoading ? <Spinner /> : `Sign up`}
                </button>
              </div>

              <p className="text-center my-6">
                You have an account ?{" "}
                <span className="text-primary">Sign in</span>{" "}
              </p>
            </form>
          </div>
          <hr className="my-4" />
          <p className="font-light italic text-gray-600 text-center text-base leading-relaxed">
            Revolutionize your hospitality management with our cutting-edge
            system analysis solution, providing instant insights for strategic
            decision-making and elevated guest satisfaction
          </p>
        </div>
        <div className="basis-full w-[98%] md:w-full mx-auto md:basis-[60%] relative ">
          <div className="w-full h-full">
            <img
              src={AnalyisImage}
              alt="undraw_real_time_analytics_re_yliv"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute w-[70%] bottom-0 md:bottom-52 text-left md:text-right right-0 p-3 md:p-8 text-gray-600">
            <h1 className="text-2xl font-bold">System Analysis Solution</h1>
            <hr className="my-2" />
            <p className="text-base">
              Empower your hospitality business with our real-time data analysis
              and decision-making system, seamlessly optimizing operations and
              enhancing guest experiences
            </p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Register;
