/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Input, Select, Spinner } from "@chakra-ui/react";
import Button from "./button";

import {
  useCreateProductMutation,
  useCreateTransactionMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useUpdateTransactionMutation,
} from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";

export default function BarTransaction({ department, product }) {
  console.log("Department on Model: " + department.id);
  console.log("Product on Model: " + product);

  const [createTransaction, createTransactionInfo] =
    useCreateTransactionMutation();
  const [updateTransaction, updateTransactionInfo] =
    useUpdateTransactionMutation();

  const createTransactionLoading = createTransactionInfo.isLoading;
  const updateTransactionLoading = updateTransactionInfo.isLoading;

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

  const CreateTransaction = async (e) => {
    e.preventDefault();

    if (!clientName || !units || !descr || !status || !productId) {
      return errorToast("Fill all required fields");
    }

    try {
      const newdata = await createTransaction({
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
  const UpdateTransaction = async (e) => {
    e.preventDefault();

    if (!clientName || !units || !descr || !status || !productId) {
      return errorToast("Fill all required fields");
    }
    console.log("Fill all required fields", product.id);
    try {
      const newdata = await updateTransaction({
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
        <div>
          <div>
            <p className="text-gray font-medium text-base py-2">Product Name</p>
            <Select
              placeholder="Select product"
              defaultValue={productId}
              onBlur={(e) => setProductId(e.target.value)}
              className="dark:bg-dark-bg"
            >
              {data?.data.map((product) => (
                <>
                  <option
                    key={product?.id}
                    value={product?.id}
                    className="dark:bg-dark-bg"
                  >
                    {product?.drinkName}
                  </option>
                </>
              ))}
            </Select>
          </div>
          <div>
            <p className="text-gray font-medium text-base py-2">Client Name</p>
            <Input
              type="text"
              placeholder="name"
              defaultValue={clientName}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setClientName(e.target.value)}
            />
            <br />
          </div>
          <div>
            <p className="text-gray font-medium text-base py-2">Contact</p>
            <Input
              type="text"
              placeholder="contact"
              defaultValue={phone}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setPhone(e.target.value)}
            />
            <br />
          </div>
          <div>
            <p className="text-gray font-medium text-base py-2">Quantity</p>
            <Input
              type="text"
              placeholder="number"
              defaultValue={units}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setUnits(e.target.value)}
            />
            <br />
          </div>
          <div>
            <p className="text-gray font-medium text-base py-2">Details</p>
            <Input
              type="text"
              placeholder="details"
              defaultValue={descr}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setDescr(e.target.value)}
            />
            <br />
          </div>
          <div>
            <p className="text-gray font-medium text-base py-2">Status</p>
            <Select
              placeholder="Select status"
              defaultValue={status}
              onBlur={(e) => setStatus(e.target.value)}
              className="dark:bg-dark-bg"
            >
              <>
                <option value="pending" className="dark:bg-dark-bg">
                  Pending
                </option>
                <option value="complete " className="dark:bg-dark-bg">
                  Complete
                </option>
              </>
            </Select>

            <br />
          </div>

          <Button
            onClick={product ? UpdateTransaction : CreateTransaction}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal w-full "
            disabled={
              !clientName && !units && !descr && !status && !productId
                ? true
                : false
            }
          >
            {product ? (
              updateTransactionLoading ? (
                <Spinner />
              ) : (
                "Update"
              )
            ) : createTransactionLoading ? (
              <Spinner />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
