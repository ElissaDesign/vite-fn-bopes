/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Input, Spinner } from "@chakra-ui/react";
import Button from "./button";

import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";

export default function BarProduct({ department, product }) {
  console.log("Department on Model: " + department.id);
  console.log("Product on Model: " + product);

  const [createProduct, createProductInfo] = useCreateProductMutation();
  const [updateProduct, updateProductInfo] = useUpdateProductMutation();

  const createProductLoading = createProductInfo.isLoading;
  const updateProductLoading = updateProductInfo.isLoading;

  if (product) {
    const { data } = useGetProductQuery(product.id);
    console.log(data);
  }

  const [drinkType, setDrinkType] = useState(product?.drinkType || "");
  const [drinkName, setDrinkName] = useState(product?.drinkName || "");
  const [purchasingPrice, setPurchasingPrice] = useState(
    product?.purchasingPrice || ""
  );
  const [quantity, setQuantity] = useState(product?.quantity || "");

  const CreateProduct = async (e) => {
    e.preventDefault();

    if (!drinkType || !drinkName || !purchasingPrice || !quantity) {
      return errorToast("Fill all required fields");
    }

    try {
      const newdata = await createProduct({
        departmentId: department?.id,
        drinkType,
        drinkName,
        purchasingPrice,
        quantity,
      }).unwrap();
      console.log("User Invitation:", newdata);
      successToast(newdata?.message || "Created");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };
  const UpdateProduct = async (e) => {
    e.preventDefault();

    if (!drinkType || !drinkName || !purchasingPrice || !quantity) {
      return errorToast("Fill all required fields");
    }
    console.log("Fill all required fields", product.id);
    try {
      const newdata = await updateProduct({
        productId: product?.id,
        product: {
          drinkType,
          drinkName,
          purchasingPrice,
          quantity,
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
            <p className="text-gray font-medium text-base py-2">
              Type of Drink(liquor/beer)
            </p>
            <Input
              type="text"
              placeholder="Liquor/beer"
              defaultValue={drinkType}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setDrinkType(e.target.value)}
            />
            <br />
          </div>
          <div>
            <p className="text-gray font-medium text-base py-2">
              Name of the Drink
            </p>
            <Input
              type="text"
              placeholder="skol/united gin"
              defaultValue={drinkName}
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setDrinkName(e.target.value)}
            />
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

          <Button
            onClick={product ? UpdateProduct : CreateProduct}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal w-full "
            disabled={
              !drinkType && !drinkName && !purchasingPrice && !quantity
                ? true
                : false
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
