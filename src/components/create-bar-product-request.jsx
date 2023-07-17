/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import { Input, Select, Spinner } from "@chakra-ui/react";
import Button from "./button";

import {
  useCreateBarProductRequestMutation,
  useGetProductsQuery,
  useUpdateBarProductRequestMutation,
} from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";

export default function BarProduct({ department, product }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, [department]);

  const [createBarProductRequest, createProductInfo] =
    useCreateBarProductRequestMutation();
  const [updateBarProductRequest, updateProductInfo] =
    useUpdateBarProductRequestMutation();

  const createProductLoading = createProductInfo.isLoading;
  const updateProductLoading = updateProductInfo.isLoading;

  const { data } = useGetProductsQuery(department.id, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [barProductId, setProductId] = useState(product?.barProductId || "");
  const [purchasingPrice, setPurchasingPrice] = useState(
    product?.purchasingPrice || null
  );
  const [quantity, setQuantity] = useState(product?.quantity || null);

  const [sellingPrice, setSellingPrice] = useState(
    product?.sellingPrice || null
  );
  const [status, setStatus] = useState(product?.status || "");

  const CreateProductRequest = async (e) => {
    e.preventDefault();

    if (!barProductId || !purchasingPrice || !quantity) {
      return errorToast("Fill all required fields");
    }

    try {
      const newdata = await createBarProductRequest({
        serviceId: department?.id,
        barProductId,
        purchasingPrice,
        quantity,
      }).unwrap();
      successToast(newdata?.message || "Created");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };
  const UpdateProductRequest = async (e) => {
    e.preventDefault();

    if (!barProductId || !purchasingPrice || !quantity) {
      return errorToast("Fill all required fields");
    }
    try {
      const newdata = await updateBarProductRequest({
        productId: product?.id,
        product: {
          barProductId,
          purchasingPrice,
          sellingPrice,
          status,
          quantity,
        },
      }).unwrap();
      successToast(newdata?.message || "Updated");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };

  return (
    <div className="">
      <div className="w-full mx-auto">
        <div>
          <div className={role === "manager" ? "block" : "hidden"}></div>

          <div>
            <p className="text-gray font-medium text-base py-2">
              Type of Drink(liquor/beer)
            </p>
            <Select
              placeholder="Select product"
              defaultValue={barProductId}
              onBlur={(e) => setProductId(e.target.value)}
              className="dark:bg-dark-bg"
            >
              {data?.data.map((product, index) => (
                <option
                  value={product.id}
                  key={index}
                  className="dark:bg-dark-bg hover:dark:bg-dark-bg"
                  aria-required
                >
                  {product.drinkName}
                </option>
              ))}
            </Select>
            <br />
          </div>

          <div>
            <p className="text-gray font-medium text-base py-2">
              Purchasing price
            </p>
            <Input
              type="text"
              placeholder="purchase price"
              defaultValue={purchasingPrice}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setPurchasingPrice(e.target.value)}
            />
            <br />
          </div>
          <div className={role === "manager" ? "block" : "hidden"}>
            <p className="text-gray font-medium text-base py-2">
              Selling Price
            </p>
            <Input
              type="text"
              placeholder="selling price"
              defaultValue={sellingPrice}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setSellingPrice(e.target.value)}
            />
            <br />
          </div>
          <div>
            <p className="text-gray font-medium text-base py-2">Quantity</p>
            <Input
              type="text"
              placeholder="number of bottles"
              defaultValue={quantity}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setQuantity(e.target.value)}
            />
            <br />
          </div>
          <div className={role === "manager" ? "block" : "hidden"}>
            <p className="text-gray font-medium text-base py-2">Status</p>

            <Select
              placeholder="Select status"
              onBlur={(e) => setStatus(e.target.value)}
              className="dark:bg-dark-bg"
              defaultValue={status}
            >
              <option
                value="pending"
                className="dark:bg-dark-bg hover:dark:bg-dark-bg"
              >
                Pending
              </option>
              <option
                value="approved"
                className="dark:bg-dark-bg hover:dark:bg-dark-bg"
              >
                Approved
              </option>
              <option
                value="complete"
                className="dark:bg-dark-bg hover:dark:bg-dark-bg"
              >
                Complete
              </option>
            </Select>
            <br />
          </div>

          <Button
            onClick={product ? UpdateProductRequest : CreateProductRequest}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal w-full "
            disabled={
              !barProductId && !purchasingPrice && !quantity ? true : false
            }
          >
            {product ? (
              updateProductLoading ? (
                <Spinner />
              ) : (
                "Update"
              )
            ) : createProductLoading ? (
              <Spinner />
            ) : (
              "Request"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
