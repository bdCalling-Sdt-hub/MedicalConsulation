"use client";

import { Button, Input, Table, Typography } from "antd";

import Image from "next/image";
import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";
import { Search } from "lucide-react";
import { imageUrl } from "../../../../../../redux/api/baseApi";
import { useAllPatientsQuery } from "../../../../../../redux/apiSlices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Text } = Typography;

const PatientsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);

  const pageSize = 10;

  const { data: patient } = useAllPatientsQuery({
    page: 1,
    limit: 10,
    search: "",
  });

  const data = patient?.data?.result.map((item, index) => ({
    sId: item?._id,
    image: item?.image,
    name: item?.name,
    email: item?.email,
    dateAndTime: new Date(item?.createdAt).toLocaleString(),
    nhsNumber: item?.nhsNumber,
    details: "Details",
    totalConsultationHistory: item?.consultationHistory?.length,
    // rating: index % 5 + 1, // Generate rating between 1 and 5
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center">{record.name}</div>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <div className="flex items-center">
          <Image
            // loader={() => imageUrl + record.image}
            width={100}
            height={100}
            src={imageUrl + record.image}
            className="w-9 h-9 rounded"
            alt="avatar"
          />
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
      title: "Total Consultation History",
      dataIndex: "totalConsultationHistory",
      key: "totalConsultationHistory",
    },

    {
      title: "NHS Number",
      dataIndex: "nhsNumber",
      key: "nhsNumber",
    },
    {
      title: "Prescription",
      dataIndex: "details",
      key: "details",
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

  const route = useRouter();

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
      <div className="flex items-center justify-between gap-4">
        {/* <Text className="text-2xl font-bold font-merri">
          Patients Management
        </Text> */}
        <Input
          prefix={<Search />}
          className="flex-1 rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search by email"
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
          }}
        />
      </div>
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
