/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  Spinner,
} from "@chakra-ui/react";
import Button from "./button";

import { useCreateProductMutation } from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";
import { Icon } from "@iconify/react";

export default function BarProduct({ department }) {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [drinkType, setDrinkType] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [purchasingPrice, setPurchasingPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const RegisterMember = async (e) => {
    e.preventDefault();

    if (!drinkType || !drinkName || !purchasingPrice || !quantity) {
      return errorToast("Fill all required fields");
    }

    try {
      const newdata = await createProduct({
        drinkType,
        drinkName,
        purchasingPrice,
        quantity,
      }).unwrap();
      console.log("User Invitation:", newdata);
      successToast(newdata?.message || "Invitation sent");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };

  console.log(department);

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
              placeholder="Liquor/Beer"
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
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setQuantity(e.target.value)}
            />
            <br />
          </div>

          <Button
            onClick={RegisterMember}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal w-full "
            disabled={
              !drinkType || !drinkName || !purchasingPrice || !quantity
                ? true
                : false
            }
          >
            {isLoading ? <Spinner /> : "Send invitation"}
          </Button>
        </div>
      </div>
    </div>
  );
}
