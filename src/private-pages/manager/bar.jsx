/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Button from "../../components/button";
import BarProduct from "../../components/create-bar-product-request";
import { Icon } from "@iconify/react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/api/apiSlice";
import DataTable from "../../components/data-table";
import moment from "moment";
import { useState } from "react";
import { errorToast, successToast } from "../../hooks/toast-messages";
import BarProductCreation from "../../components/bar-product";

export default function BarAccountant({ department }) {
  const [product, setProduct] = useState();

  console.log("productId", product);
  const {
    isOpen: newDrinkRequestModalOpen,
    onOpen: openNewDrinkRequestModal,
    onClose: closeNewDrinkRequestModal,
  } = useDisclosure();

  const {
    isOpen: newDrinkModalOpen,
    onOpen: openNewDrinkModal,
    onClose: closeNewDrinkModal,
  } = useDisclosure();

  const { data, isLoading } = useGetProductsQuery(department?.id, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  console.log("Products", product);

  const [deleteProduct] = useDeleteProductMutation();

  const handleClickUpdate = async (row) => {
    setProduct(row.original);
    openNewDrinkRequestModal();

    // Wait for both operations to complete
    await Promise.all([setProduct(row.original), openNewDrinkRequestModal()]);

    // Your code to run after both operations are completed
    console.log("Both operations completed.");
  };

  const handleClickNewDrinkRequest = async () => {
    setProduct();
    openNewDrinkRequestModal();

    // Wait for both operations to complete
    await Promise.all([setProduct(), openNewDrinkRequestModal()]);

    // Your code to run after both operations are completed
    console.log("Both operations completed.");
  };

  const handleClickNewDrink = async () => {
    setProduct();
    openNewDrinkModal();

    // Wait for both operations to complete
    await Promise.all([setProduct(), openNewDrinkModal()]);
  };

  const ModelNewDrinkRequest = (
    <Modal
      isOpen={newDrinkRequestModalOpen}
      onClose={closeNewDrinkRequestModal}
    >
      <ModalOverlay />
      <ModalContent className=" dark:bg-dark-bg dark:text-dark-text-fill">
        <ModalHeader className="text-center">New Drinks Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <BarProduct department={department} product={product} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  const ModelNewDrink = (
    <Modal isOpen={newDrinkModalOpen} onClose={closeNewDrinkModal}>
      <ModalOverlay />
      <ModalContent className=" dark:bg-dark-bg dark:text-dark-text-fill">
        <ModalHeader className="text-center">New Drink</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <BarProductCreation department={department} product={product} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  const columns = [
    { Header: "Date", accessor: "date" },
    { Header: "Drink Name", accessor: "drinkName" },
    { Header: "Purchase Price", accessor: "purchasingPrice" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Total Price", accessor: "totalPrice" },
    { Header: "Sale on", accessor: "sellingPrice" },
    { Header: "Status", accessor: "status" },

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
            onClick={() => handleClickUpdate(row)}
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
                console.log(deletedproduct);
                successToast(deletedproduct?.message);
              } catch (error) {
                console.log(error);
                errorToast(error?.data.message);
              }
            }}
          />

          <Icon
            icon="flat-color-icons:view-details"
            width="30"
            height="30"
            cursor="pointer"
            color="#148fb6"
            // onClick={() => handleClickOpen(row.original.email)}
          />
        </div>
      ),
    },
  ];

  let datum = [];
  if (data && data?.data?.length > 0) {
    data?.data.map((data, index) => {
      const date = moment(data?.createdAt);
      const formattedDate = date.format("MMMM Do, YYYY, h:mm:ss A");
      const totalPrice = data?.purchasingPrice * data?.quantity;
      datum[index] = {};
      datum[index].date = formattedDate;
      datum[index].id = data.id;
      datum[index].drinkName = data.drinkName;
      datum[index].purchasingPrice = data.purchasingPrice;
      datum[index].quantity = data.quantity;
      datum[index].totalPrice = totalPrice;
      datum[index].status = data.status;
    });
  }

  return (
    <div className="px-[25px] pt-[72px]">
      <div className="flex items-center flex-row justify-between">
        <h1 className="text-gray-800  dark:text-dark-text-fill text-[28px] leading-[34px] font-semibold cursor-pointer">
          Drinks
        </h1>
        <div className="">
          <Button
            onClick={() => handleClickNewDrink()}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal mr-2"
          >
            Drinks
          </Button>
          <Button
            onClick={() => handleClickNewDrinkRequest()}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal mr-2"
          >
            New request
          </Button>
        </div>
      </div>

      <div className="mt-[25px] pb-[15px]">
        <DataTable
          data={data?.data.length > 0 ? datum : [{}]}
          columns={columns}
          title="Purchase Request List"
        />
      </div>

      <div>
        {/* Model for creating new drink request */}
        {ModelNewDrinkRequest}

        {/* Model for creating new drink */}
        {ModelNewDrink}
      </div>
    </div>
  );
}
