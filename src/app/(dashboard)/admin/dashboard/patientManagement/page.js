"use client";

import { Input, Table, Typography } from "antd";

import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { imageUrl } from "../../../../../../redux/api/baseApi";
import { useAllPatientsQuery } from "../../../../../../redux/apiSlices/authSlice";
import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";

const { Text } = Typography;

const PatientsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSizeChange, onShowSizeChange] = useState(10);

  console.log("currentPage", currentPage);
  // console.log("searchTerm", typeof searchTerm);

  const pageSize = 10;

  const { data: patient } = useAllPatientsQuery({
    page: currentPage,
    // limit: pageSize,
    limit: showSizeChange,
    search: searchTerm,
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
    dateOfBirth: item?.dateOfBirth
      ? new Date(item?.dateOfBirth).toLocaleDateString()
      : "N/A",
    address: item?.address,
  }));

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <div className="flex items-center">
          <Image
            width={100}
            height={100}
            src={
              record?.image
                ? imageUrl + record?.image
                : require("../../../../../../public/images/avatar.png")
            }
            className="w-9 h-9 rounded"
            alt="avatar"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center">{record.name}</div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Date and Time",
    //   dataIndex: "dateAndTime",
    //   key: "dateAndTime",
    // },
    {
      title: "Total Consultation History",
      dataIndex: "totalConsultationHistory",
      key: "totalConsultationHistory",
    },
    {
      title: "Unique ID Number",
      dataIndex: "nhsNumber",
      key: "nhsNumber",
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const route = useRouter();

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUser = (action) => {
    setUserData(action);
    setRole(action.role);
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
      <div className="flex justify-between">
        <h1 className="p-4 ">
          <span className="text-xl font-bold">All Patients</span>
        </h1>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Input
          prefix={<Search />}
          className="flex-1 rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search by email"
          onChange={handleSearch}
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
            // pageSize,
            showSizeChange,
            total: patient?.data?.total,
            current: currentPage,
            onChange: handlePage,
            onShowSizeChange: (current, pageSize) => onShowSizeChange(pageSize),
          }}
          rowClassName={() => "hover:bg-transparent"}
        />

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
