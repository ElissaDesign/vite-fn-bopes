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
import BarProduct from "../../components/create-bar-product";

export default function BarAccountant() {
  const {
    isOpen: newDrinkModalOpen,
    onOpen: openNewDrinkModal,
    onClose: closeNewDrinkModal,
  } = useDisclosure();

  const ModelNewDrink = (
    <Modal isOpen={newDrinkModalOpen} onClose={closeNewDrinkModal}>
      <ModalOverlay />
      <ModalContent className=" dark:bg-dark-bg dark:text-dark-text-fill">
        <ModalHeader className="text-center">New Drink</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <BarProduct />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  return (
    <div className="px-[25px] pt-[72px]">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-gray-800  dark:text-dark-text-fill text-[28px] leading-[34px] font-semibold cursor-pointer">
          Drinks
        </h1>
        <div className="">
          <Button
            onClick={openNewDrinkModal}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal mr-2"
          >
            New Drink
          </Button>
        </div>
      </div>
      <div>
        {/* Model for creating new drink */}
        {ModelNewDrink}
      </div>
    </div>
  );
}
