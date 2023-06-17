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
import { errorToast, successToast } from "../../hooks/toast-messages";
import AssignUserDepartment from "../../components/assign-department";
import { useGetAllUsersWithDepartmentsQuery } from "../../redux/api/apiSlice";
import RegisterMember from "../../components/user-register";
import { Icon } from "@iconify/react";
import DataTable from "../../components/data-table";

export default function Employees() {
  const {
    isOpen: inviteEmployeeModalOpen,
    onOpen: openInviteEmployeeModal,
    onClose: closeInviteEmployeeModal,
  } = useDisclosure();

  const {
    isOpen: assignDepartmentModalOpen,
    onOpen: openAssignDepartmentModal,
    onClose: closeAssignDepartmentModal,
  } = useDisclosure();

  // get all users with departments assigned
  const { data, isLoading } = useGetAllUsersWithDepartmentsQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  console.log(data);

  const ModelInviteEmployee = (
    <Modal isOpen={inviteEmployeeModalOpen} onClose={closeInviteEmployeeModal}>
      <ModalOverlay />
      <ModalContent className=" dark:bg-dark-bg dark:text-dark-text-fill">
        <ModalHeader className="text-center">Assign Department</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterMember />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  const ModelAssignDepartment = (
    <Modal
      isOpen={assignDepartmentModalOpen}
      onClose={closeAssignDepartmentModal}
    >
      <ModalOverlay />
      <ModalContent className=" dark:bg-dark-bg dark:text-dark-text-fill">
        <ModalHeader className="text-center">Assign Department</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AssignUserDepartment />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  const columns = [
    { Header: "Names", accessor: "name" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
    { Header: "Departments", accessor: "departments" },

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
            /* istanbul ignore next */
            // onClick={() => {
            //   setSelectedOptionUpdate({
            //     value: row.original.cohort,
            //     label: row.original.cohort,
            //   });
            //   setSelectedTeamOptionUpdate({
            //     value: row.original.team,
            //     label: row.original.team,
            //   });
            //   console.log(selectedOption2);
            //   console.log(row.original.team);
            //   removeEditModel();
            //   setEditEmail(row.original.email);
            //   setEditCohort(row.original.cohort);
            //   setEditTeam(row.original.team);
            // }}
          />
          <Icon
            icon="mdi:close-circle-outline"
            width="30"
            height="30"
            cursor="pointer"
            color="#148fb6"
            /* istanbul ignore next */
            // onClick={() => {
            //   removeTraineeMod();
            //   setDeleteEmail(row.original.email);
            //   setDeleteFromCohort(row.original.team);
            // }}
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
  if (data?.data && data?.data.length > 0) {
    data?.data.map((data, index) => {
      const departments = data?.departments.map((obj) => `${obj.name}`);
      const nonArrayString = "Assiged: ";
      const result = nonArrayString + " " + departments.join(" ");
      datum[index] = {};
      datum[index].name = data.name;
      datum[index].email = data.email;
      datum[index].phone = data.phone;
      datum[index].role = data.role;
      datum[index].departments = result;
    });
  }

  return (
    <div className="px-[25px] pt-[72px]">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-gray-800  dark:text-dark-text-fill text-[28px] leading-[34px] font-semibold cursor-pointer">
          Employees
        </h1>
        <div className="flex flex-row items-center justify-center">
          <Button
            onClick={openInviteEmployeeModal}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal mr-2"
          >
            Invite Employee
          </Button>
          <Button
            onClick={openAssignDepartmentModal}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal "
          >
            Assign Department
          </Button>
        </div>
      </div>
      <div className="mt-[25px] pb-[15px]">
        <DataTable
          data={data?.data.length > 0 ? datum : [{}]}
          columns={columns}
          title="Customers List"
        />
      </div>

      <div>
        {/* Model for Registering a user */}
        {ModelInviteEmployee}

        {/* Model for assign department a user */}
        {ModelAssignDepartment}
      </div>
    </div>
  );
}
