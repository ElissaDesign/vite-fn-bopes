/* eslint-disable react-hooks/rules-of-hooks */
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const checkTokenExpiration = async () => {
  const { t } = useTranslation();

  const token = window.localStorage.getItem("auth_token");
  let expiration = "";
  token ? (expiration = await jwt_decode(token)) : (expiration = null);

  if (expiration !== null && expiration.exp * 1000 < Date.now()) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("departments");
    toast.error(t("Your token has expired, try to login again"));
    return false;
  } else if (expiration !== null && expiration.exp * 1000 > Date.now()) {
    return true;
  } else {
    return false;
  }
};

export default checkTokenExpiration;
