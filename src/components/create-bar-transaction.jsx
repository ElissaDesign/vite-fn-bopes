/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Input, Select, Spinner } from "@chakra-ui/react";
import Button from "./button";

import {
  useCreateBarTransactionMutation,
  useGetBarProductsPurchasedQuery,
  useUpdateBarTransactionMutation,
} from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";

export default function BarTransaction({ department, product }) {
  console.log("Department on Model: " + department.id);
  console.log("Product on Model: " + product);

  const [createBarTransaction, createTransactionInfo] =
    useCreateBarTransactionMutation();
  const [updateBarTransaction, updateTransactionInfo] =
    useUpdateBarTransactionMutation();

  const createTransactionLoading = createTransactionInfo.isLoading;
  const updateTransactionLoading = updateTransactionInfo.isLoading;

  const { data } = useGetBarProductsPurchasedQuery(department?.id, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  console.log("Purchase Pr", data);

  const [clientName, setClientName] = useState(product?.clientName || "");
  const [units, setUnits] = useState(product?.units || "");
  const [descr, setDescr] = useState(product?.descr || "");
  const [phone, setPhone] = useState(product?.phone || "");
  const [status, setStatus] = useState(product?.status || "");
  const [barProductId, setProductId] = useState(product?.barProductId || "");

  const CreateBarTransaction = async (e) => {
    e.preventDefault();

    if (!clientName || !units || !descr || !status || !barProductId) {
      return errorToast("Fill all required fields");
    }

    try {
      const newdata = await createBarTransaction({
        clientName,
        units,
        descr,
        phone,
        status,
        barProductId,
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

    if (!clientName || !units || !descr || !status || !barProductId) {
      return errorToast("Fill all required fields");
    }
    try {
      const newdata = await updateBarTransaction({
        transactionId: product?.id,
        transaction: {
          clientName,
          units,
          descr,
          phone,
          status,
          barProductId,
        },
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
              defaultValue={barProductId}
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
                <option value="unpaid" className="dark:bg-dark-bg">
                  Unpaid
                </option>
                <option value="paid" className="dark:bg-dark-bg">
                  Paid
                </option>
              </>
            </Select>

            <br />
          </div>

          <Button
            onClick={product ? UpdateBarTransaction : CreateBarTransaction}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal w-full "
            disabled={
              !clientName && !units && !descr && !status && !barProductId
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
