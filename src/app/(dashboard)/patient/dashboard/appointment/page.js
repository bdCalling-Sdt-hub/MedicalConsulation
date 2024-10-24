"use client";

import { Input, Table } from "antd";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";
import SelectBox from "../../../../../components/dashboard/share/SelectBox";
import image from "../../../../../public/images/Notifications/Avatar.png";

const selectOptions = [
  { value: "1", label: "Last week" },
  { value: "2", label: "Last Month" },
  { value: "3", label: "Last Year" },
];
const Appointment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState();
  const [role, setRole] = useState();
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const navigate = useRouter(); // Import useNavigate hook

  const pageSize = 10;

  const data = [...Array(9).keys()].map((item, index) => ({
    sId: index + 1,
    image: <img src={image} className="w-9 h-9 rounded" alt="avatar" />,
    name: "Richardo Mathew " + (index + 1),
    email: "richardoa@padel.com",
    dateAndTime: "01 Jan, 2024 at 10:00 am",
    prescription: "Details",
    status: "Upcoming",
    rating: (index % 5) + 1,
    role: index % 2 === 0 ? "Admin" : "Member",
    action: {
      sId: index + 1,
      image: <img src={image} className="w-9 h-9 rounded" alt="" />,
      name: "Richardo Mathew " + (index + 1),
      dateAndTime: "01 Jan, 2024 at 10:00 am",
      consultant: "Dr. Jhonathon Swift",
      prescription: "Details",
      status: "Upcoming",
      division: "Cardiology",
      dateOfBirth: "24-05-2024",
      rating: (index % 5) + 1,
      contact: "0521545861520",
      role: index % 2 === 0 ? "Admin" : "Member",
    },
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <div className="flex items-center">
          <Link
            href={`/dashboard/patient-profile/${record.sId}`}
            className="ml-3 text-blue-500 hover:underline"
          >
            {record.name}
          </Link>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date and Time",
      dataIndex: "dateAndTime",
      key: "dateAndTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    // {
    //   title: "Prescription",
    //   dataIndex: "Create",
    //   key: "prescription",
    //   render: (_: any, record: UserData) => (
    //     <Button onClick={() => handlePrescriptionClick(record)} type="secondary">
    //       Create
    //     </Button>
    //   ),
    // },
    // {
    //   title: "Ratings",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rating) => <Rate className="custom-rate" disabled value={rating} />,
    // },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleUser(record.action)} // Calls handleUser for navigation
            className="hover:bg-primary p-1 rounded bg-blue border border-gray p-2"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handleUser = (action) => {
    // Use the navigate function to redirect to the appointment/patientProfile with the ID
    navigate.push(`/dashboard/appointment/patientProfile/${action.sId}`);
  };

  const handlePrescriptionClick = (record) => {
    setUserData(record.action);
    setOpenPrescriptionModal(true);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };
  return (
    <div>
      <div className="flex justify-between">
        <Input
          prefix={<Search />}
          className="w-1/2 rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search by email"
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
          }}
        />
        <div>
          <SelectBox
            placeholder="Last week"
            options={selectOptions}
            onChange={handleSelectChange}
            style={{ width: 150 }}
          />
        </div>
      </div>
      <div className="py-6">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize,
            total: 50,
            current: currentPage,
            onChange: handlePage,
          }}
          rowClassName={() => "hover:bg-transparent"}
        />

        {/* Approve Modal */}
        <ModalComponent
          openModel={openModel}
          setOpenModel={setOpenModel}
          title="User role"
          subtitle="This is the current role of the selected user"
          cancelLabel="Cancel"
          role={role}
          setRole={setRole}
          showRoleSelect={true}
          confirmLabel="Save Changes"
          onConfirm={() => {}}
          value={userData}
        />

        {/* Delete Modal */}
        <ModalComponent
          openModel={openDeleteModal}
          setOpenModel={setOpenDeleteModal}
          title="Delete User"
          subtitle="Are you sure you want to delete this item?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          value={userData}
          onConfirm={() => {}}
        />

        {/* Prescription Modal */}
        <ModalComponent
          openModel={openPrescriptionModal}
          setOpenModel={setOpenPrescriptionModal}
          title="Prescription Details"
          subtitle="Here are the details of the prescription"
          confirmLabel="Print"
          cancelLabel="Close"
          value={userData}
        />
      </div>
    </div>
  );
};

export default Appointment;
