import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState();
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;


  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Make a request to your backend to verify the email
        const response = await axios.get(
          `${BACKEND_URL}/auth/verify-email?token=${token}`
        );
        console.log(response, token);
        // Update the verification status based on the response
        setVerificationStatus(response.data.message);
      } catch (error) {
        // Handle error, e.g., display an error message to the user
        console.error(error);
        setVerificationStatus("Error verifying email");
      }
    };

    // Call the verification function
    verifyEmail();
  }, [token]);

  return (
    <div className="dark:bg-dark-bg h-screen overflow-x-hidden antialiased ">
      <div className="flex flex-col justify-center items-center gap-3 mt-32 overflow-x-hidden">
        <div className="flex items-center gap-3">
          <Icon icon="logos:google-analytics" />
          <h1 className="text-gray-300 font-semibold text-lg">
            Email Verification
          </h1>
        </div>

        <div>
          {verificationStatus && (
            <p className="flex items-center gap-3">
              <Icon icon="mdi:check-circle" className="text-primary text-lg" />{" "}
              {verificationStatus}
            </p>
          )}
        </div>

        <Link to="/auth/login">
          <div className="flex items-center gap-3 mt-20 cursor-pointer font-normal text-gray-300 px-2 py-1 ">
            <Icon icon="solar:login-bold-duotone" className="text-primary" />
            Login in
          </div>
        </Link>
      </div>
    </div>
  );
}
