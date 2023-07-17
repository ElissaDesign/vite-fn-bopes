/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import { Input, Select, Spinner } from "@chakra-ui/react";
import Button from "./button";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";
import { Icon } from "@iconify/react";
import DataTable from "./data-table";
import { getBarProducts } from "../redux/slices/barProductsSlice";

export default function BarProductCreation({ department, product }) {
  const dispatch = useDispatch();
  const barproducts = useSelector((state) => state.barproducts?.data);

  const [createProduct, createProductInfo] = useCreateProductMutation();
  const [updateProduct, updateProductInfo] = useUpdateProductMutation();

  const createProductLoading = createProductInfo.isLoading;
  const updateProductLoading = updateProductInfo.isLoading;

  const { data } = useGetProductsQuery(department?.id, {
    pollingInterval: 6000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    dispatch(getBarProducts(data?.data));
  }, [data, dispatch]);

  const [deleteProduct] = useDeleteProductMutation();

  const [drinkType, setDrinkType] = useState(product?.drinkType || "");
  const [drinkName, setDrinkName] = useState(product?.drinkName || "");

  const CreateProduct = async (e) => {
    e.preventDefault();

    if (!drinkType || !drinkName) {
      return errorToast("Fill all required fields");
    }

    try {
      const newdata = await createProduct({
        serviceId: department?.id,
        drinkType,
        drinkName,
      }).unwrap();
      successToast(newdata?.message || "Created");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };
  const UpdateProduct = async (e) => {
    e.preventDefault();

    if (!drinkType || !drinkName) {
      return errorToast("Fill all required fields");
    }
    try {
      const newdata = await updateProduct({
        productId: product?.id,
        product: {
          drinkType,
          drinkName,
        },
      }).unwrap();
      successToast(newdata?.message || "Updated");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };
  const columns = [
    { Header: "Drink Type", accessor: "drinkType" },
    { Header: "Drink Name", accessor: "drinkName" },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => (
        <div
          className={
            " items-center" + (data?.data.length > 0 ? " flex" : " hidden")
          }
        >
          <Icon
            icon="el:file-edit-alt"
            className="mr-2"
            width="25"
            height="25"
            cursor="pointer"
            color="#148fb6"
            // onClick={() => handleClickUpdate(row)}
          />

          <Icon
            icon="mdi:close-circle-outline"
            width="30"
            height="30"
            cursor="pointer"
            color="#148fb6"
            onClick={async () => {
              try {
                const deletedproduct = await deleteProduct(
                  row?.original.id
                ).unwrap();
                successToast(deletedproduct?.message);
              } catch (error) {
                console.log(error);
                errorToast(error?.data.message);
              }
            }}
          />
        </div>
      ),
    },
  ];

  let datum = [];
  if (barproducts && barproducts?.length > 0) {
    barproducts?.map((data, index) => {
      datum[index] = {};
      datum[index].id = data.id;
      datum[index].drinkType = data.drinkType;
      datum[index].drinkName = data.drinkName;
    });
  }

  return (
    <div className="">
      <div className="w-full mx-auto">
        <div>
          <div>
            <p className="text-gray font-medium text-base py-2">
              Type of Drink(liquor/beer)
            </p>
            <Select
              placeholder="Select product type"
              defaultValue={drinkType}
              onBlur={(e) => setDrinkType(e.target.value)}
              className="dark:bg-dark-bg"
            >
              <option
                value="beer"
                className="dark:bg-dark-bg hover:dark:bg-dark-bg"
                aria-required
              >
                beer
              </option>
              <option
                value="liqour"
                className="dark:bg-dark-bg hover:dark:bg-dark-bg"
                aria-required
              >
                liqour
              </option>
            </Select>
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

          <Button
            onClick={product ? UpdateProduct : CreateProduct}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal w-full "
            disabled={!drinkType && !drinkName ? true : false}
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
              "Create"
            )}
          </Button>
        </div>
        <div className="mt-[25px] pb-[15px] overflow-x-scroll flex-wrap">
          {datum?.length !== 0 ? (
            <DataTable data={datum} columns={columns} title="Products List" />
          ) : (
            <div className="text-center mt-48 text-lg uppercase">
              <p> No bar products found</p>
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
}
