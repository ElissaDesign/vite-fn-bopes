/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { TiPointOfInterest } from "react-icons/ti";
import { errorToast, successToast } from "../hooks/toast-messages";
import { useCreateRequestMutation } from "../redux/api/apiSlice";
import Navbar from "../components/navBar";

const Register = () => {
  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const [company, setCompany] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRequest = await createRequest({
        company,
        businessType,
        email,
        name,
        phone,
        address,
        website,
        description,
      }).unwrap();
      console.log(newRequest);
      successToast(newRequest?.data.message || "Sent");
    } catch (error) {
      console.log(error);
      errorToast("Not sent, ");
    }
  };

  return (
    <div className="dark:bg-dark-bg">
      <Navbar />

      <div className="block md:flex  flex-col md:flex-row dark:bg-dark-bg ">
        <div className="md:basis-1/2 md:mt-20 px-6 pt-20 dark:bg-dark-bg">
          <h1 className="font-bold text-2xl my-4">
            Welcome to our web app system!{" "}
          </h1>
          <p>
            We are excited to have you on board. To get started and gain access
            to your company's account, we kindly ask you to fill out the
            following information. This will enable our super admin to create
            your company profile in our system and grant you control over all
            your business activities.
          </p>
          <h1 className="font-bold text-xl my-4 text-gray-300">
            Please provide the following details:
          </h1>

          <div className="border rounded p-2">
            <form action="" className="flex flex-col" onSubmit={onSubmit}>
              <div>
                <p className="text-gray-200">
                  {" "}
                  Enter your company's official name
                </p>
                <input
                  type="text"
                  className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
                  placeholder="Company name"
                  value={company}
                  required
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div>
                <p className="text-gray-200">
                  {" "}
                  Specify the nature of your business (e.g., retail, technology,
                  consulting).
                </p>
                <input
                  type="text"
                  className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
                  placeholder="Business Type"
                  required
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
              <div>
                <p className="text-gray-200">
                  {" "}
                  Enter the full name of the owner or authorized representative.
                </p>

                <input
                  type="text"
                  className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
                  placeholder="Your full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <p className="text-gray-200">
                  Provide the email address of the owner or authorized
                  representative
                </p>
                <input
                  type="text"
                  className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <p className="text-gray-200">
                  {" "}
                  Enter the primary contact number for your company.
                </p>
                <input
                  type="text"
                  className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
                  placeholder="Contact Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <p className="text-gray-200">
                  Specify the physical address of your company's headquarters.
                </p>
                <input
                  type="text"
                  className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
                  placeholder="Company Address"
                  required
                  value={address}
                  onChange={(e) => setAdress(e.target.value)}
                />
              </div>

              <div>
                <p className="text-gray-200">
                  If applicable, provide the URL of your company's website.
                </p>
                <input
                  type="text"
                  className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
                  placeholder="Website (optional)"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div>
                <p className="text-gray-200">
                  Please provide a brief description of your company and its
                  core activities (limit: 100 words).
                </p>
                <textarea
                  type="text"
                  className="border rounded-sm my-2 py-2 px-2 font-medium w-full"
                  placeholder="Brief Description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                className="bg-blue text-white px-2 py-4 rounded font-bold"
                type="submit"
              >
                {isLoading ? <Spinner /> : `Request`}
              </button>
            </form>
          </div>
        </div>
        <div className="md:basis-1/2 bg-blue mt-20 px-8">
          <h1 className="mt-4 text-white font-bold">Terms and Conditions</h1>
          <p className="my-2">
            By submitting this registration request, you agree to the following
            terms and conditions:
          </p>
          <div className="flex flex-row items-center border-t mt-4">
            <TiPointOfInterest className="bg-white rounded text-blue mr-2" />
            <p className="text-white my-2">
              You acknowledge that the provided information is accurate and up
              to date.
            </p>
          </div>
          <div className="flex flex-row items-center">
            <TiPointOfInterest className="bg-white rounded text-blue mr-2" />
            <p className="text-white my-2">
              You understand that the owner or authorized representative will
              have administrative control over the company's account.
            </p>
          </div>
          <div className="flex flex-row items-center">
            <TiPointOfInterest className="bg-white rounded text-blue mr-2" />
            <p className="text-white my-2">
              You accept responsibility for all activities carried out under
              your company's account
            </p>
          </div>
          <div className="flex flex-row items-center">
            <TiPointOfInterest className="bg-white rounded text-blue mr-2" />
            <p className="text-white my-2">
              You agree to comply with our platform's terms of service and
              privacy policy.
            </p>
          </div>
          <p className="my-4">
            Please note that the completion of this registration form does not
            guarantee immediate access. Our super admin will review your request
            and create your company profile accordingly. Once your company is
            registered, you will receive an email notification containing your
            login credentials and instructions on how to access and manage your
            account.
          </p>
          <p className="my-4">
            Thank you for choosing our web app system. We look forward to
            supporting your business operations and helping you thrive in the
            digital landscape. If you have any questions or require further
            assistance, please don't hesitate to contact our support team at
            [support@email.com].
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
