/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Input, Select, Spinner } from "@chakra-ui/react";
import Button from "./button";

import {
  useCreateBarTransactionMutation,
  useGetProductsQuery,
  useUpdateBarTransactionMutation,
} from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";

export default function BarTransactionsDetails({ department, product }) {
  console.log("Department on Model: " + department.id);
  console.log("Product on Model: " + product);

  const [createBarTransaction, createTransactionInfo] =
    useCreateBarTransactionMutation();
  const [updateBarTransaction, updateTransactionInfo] =
    useUpdateBarTransactionMutation();

  const createBarTransactionLoading = createTransactionInfo.isLoading;
  const updateBarTransactionLoading = updateTransactionInfo.isLoading;

  const { data } = useGetProductsQuery(department?.id, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [clientName, setClientName] = useState(product?.drinkName || "");
  const [units, setUnits] = useState(product?.drinkName || "");
  const [descr, setDescr] = useState(product?.purchasingPrice || "");
  const [phone, setPhone] = useState(product?.purchasingPrice || "");
  const [status, setStatus] = useState(product?.quantity || "");
  const [productId, setProductId] = useState(product?.quantity || "");

  const CreateBarTransaction = async (e) => {
    e.preventDefault();

    if (!clientName || !units || !descr || !status || !productId) {
      return errorToast("Fill all required fields");
    }

    try {
      const newdata = await createBarTransaction({
        clientName,
        units,
        descr,
        phone,
        status,
        productId,
      }).unwrap();
      console.log("User Invitation:", newdata);
      successToast(newdata?.message || "Created");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };
  const UpdateBarTransaction = async (e) => {
    e.preventDefault();

    if (!clientName || !units || !descr || !status || !productId) {
      return errorToast("Fill all required fields");
    }
    console.log("Fill all required fields", product.id);
    try {
      const newdata = await updateBarTransaction({
        clientName,
        units,
        descr,
        phone,
        status,
        productId,
      }).unwrap();
      console.log("User Invitation:", newdata);
      successToast(newdata?.message || "Updated");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };

  console.log(department?.id);

  return (
    <div className="">
      <div className="w-full mx-auto">
        <div></div>
      </div>
    </div>
  );
}
