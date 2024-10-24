"use client";

import { Button, Input, Table } from "antd";
import { Link, Search } from "lucide-react";

import { useState } from "react";
import image from "../../../../../../public/images/Notifications/Avatar.png";
import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";

const PatientsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);

  const pageSize = 10;

  const data = [...Array(9).keys()].map((item, index) => ({
    sId: index + 1,
    image: <img src={image} className="w-9 h-9 rounded" alt="avatar" />,
    name: "Richardo Mathew " + (index + 1),
    email: "richardoa@padel.com",
    dateAndTime: "01 Jan, 2024 at 10:00 am",
    consultant: "Dr. Jhonathon Swift",
    prescription: "Details",
    division: "Cardiology",
    // rating: index % 5 + 1, // Generate rating between 1 and 5
    role: index % 2 === 0 ? "Admin" : "Member", // Dynamic role for each user
    action: {
      sId: index + 1,
      image: <img src={image} className="w-9 h-9 rounded" alt="" />,
      name: "Richardo Mathew " + (index + 1),
      dateAndTime: "01 Jan, 2024 at 10:00 am",
      consultant: "Dr. Jhonathon Swift",
      prescription: "Details",
      division: "Cardiology",
      dateOfBirth: "24-05-2024",
      // rating: index % 5 + 1, // Rating as a number (1 to 5)
      contact: "0521545861520",
      role: index % 2 === 0 ? "Admin" : "Member", // Assign role dynamically
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
            href={`patientProfile/${record.sId}`}
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
      title: "Division",
      dataIndex: "division",
      key: "division",
    },
    {
      title: "Consultant",
      dataIndex: "consultant",
      key: "consultant",
    },
    {
      title: "Prescription",
      dataIndex: "prescription",
      key: "prescription",
      render: (_, record) => (
        <Button
          onClick={() => handlePrescriptionClick(record)}
          type="secondary"
        >
          Details
        </Button>
      ),
    },
    // {
    //   title: "Ratings",
    //   dataIndex: "rating", // Use "rating" data field (numeric value)
    //   key: "rating",
    //   render: (rating) => <Rate className="custom-rate" disabled value={rating} />, // Display stars
    // }
  ];

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handleUser = (action) => {
    setUserData(action);
    setRole(action.role); // Set the role dynamically based on user action data
    setOpenModel(true);
  };

  const handleDelete = (action) => {
    setUserData(action);
    setOpenDeleteModal(true);
  };
  const handlePrescriptionClick = (record) => {
    setUserData(record.action);
    setOpenPrescriptionModal(true);
  };
  const confirmApprove = () => {
    console.log("Approved:", userData, role);
    setOpenModel(false);
  };

  const confirmDelete = () => {
    console.log("Deleted:", userData);
    setOpenDeleteModal(false);
  };

  return (
    <div>
      <Input
        prefix={<Search />}
        className="w-full rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
        placeholder="Search by email"
        style={{
          backgroundColor: "#f0f0f0",
          color: "#333333",
        }}
      />
      <div className="py-8">
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
          onConfirm={confirmApprove}
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
          onConfirm={confirmDelete}
        />
        {/* Prescription modal */}
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

export default PatientsManagement;
