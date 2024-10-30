"use client";

import { Button, Divider, Modal, Table, Tag, Typography } from "antd";
import {
  useAllDoctorQuery,
  useApprovedDoctorMutation,
  useCancelDoctorMutation,
} from "../../../../../../redux/apiSlices/authSlice";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { imageUrl } from "../../../../../../redux/api/baseApi";
import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";
import SelectBox from "../../../../../components/dashboard/share/SelectBox";

const { Text } = Typography;

const selectOptions = [
  { value: "approved", label: "Approved" },
  { value: "cancelled", label: "Cancelled" },
  { value: "pending", label: "Pending" },
];

const Doctor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const pageSize = 10;

  const { data: doctor } = useAllDoctorQuery({
    page: currentPage,
    limit: pageSize,
    filter: selectedValue || "",
  });

  // console.log(selectedValue);

  // console.log(doctor);

  const data = doctor?.data?.result.map((item, index) => ({
    _id: item?._id,
    name: item?.name,
    email: item?.email,
    image: item?.image,
    dateAndTime: new Date(item?.createdAt).toLocaleString(),
    nhsNumber: item?.nhsNumber,
    details: "Details",
    doctorApplicationStatus: item?.doctorApplicationStatus,
    totalConsultationHistory: item?.consultationHistory?.length,
    totalConsultationUpcoming: item?.consultationUpcoming?.length,

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
      title: "Total Consultation Upcoming",
      dataIndex: "totalConsultationUpcoming",
      key: "totalConsultationUpcoming",
    },
    {
      title: "NHS Number",
      dataIndex: "nhsNumber",
      key: "nhsNumber",
    },
    {
      title: "Doctor Status",
      dataIndex: "doctorApplicationStatus",
      key: "doctorApplicationStatus",
      render: (_, record) => (
        <Tag
          color={
            record.doctorApplicationStatus === "approved"
              ? "green"
              : record.doctorApplicationStatus === "pending"
              ? "orange"
              : "red"
          }
        >
          {record.doctorApplicationStatus}
        </Tag>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (_, record) => (
        <Button
          onClick={() => handlePrescriptionClick(record)}
          type="default"
          variant="outlined"
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
    setUserData(record);
    setOpenPrescriptionModal(true);
  };
  const confirmApprove = () => {
    // console.log("Approved:", userData, role);
    setOpenModel(false);
  };

  const confirmDelete = () => {
    // console.log("Deleted:", userData);
    setOpenDeleteModal(false);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    // console.log("Selected", value);
  };

  const [approvedDoctor] = useApprovedDoctorMutation();
  const [cancelDoctor] = useCancelDoctorMutation();

  const handleUserClick = (status) => {
    console.log(status);
    // setOpenPrescriptionModal(false);
    if (status === "approved") {
      cancelDoctor(userData?._id).then((res) => {
        // console.log(res);
        if (res?.data) {
          Swal.fire({
            title: "Success",
            text: res.data?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
      setOpenPrescriptionModal(false);
    } else if (status === "pending" || status === "cancelled") {
      approvedDoctor(userData?._id).then((res) => {
        console.log(res);
        if (res?.data) {
          Swal.fire({
            title: "Success",
            text: res.data?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
      setOpenPrescriptionModal(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex justify-between w-full">
          <h1 className="p-4 ">
            <span className="text-xl font-bold">Doctors</span>
          </h1>
          <div>
            <SelectBox
              placeholder="Select Status"
              options={selectOptions}
              onChange={handleSelectChange}
              style={{ width: 150 }}
            />
          </div>
        </div>
        {/* <div>
          <Input
            prefix={<Search />}
            className="flex-1 rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
            placeholder="Search by email"
            style={{
              backgroundColor: "#f0f0f0",
              color: "#333333",
            }}
          />
        </div> */}
      </div>
      {/* <div className="flex items-center justify-between gap-4">
      
        <Input
          prefix={<Search />}
          className="flex-1 rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search by email"
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
          }}
        />
      </div> */}
      <div className="py-2">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize,
            total: doctor?.data?.total,
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
        <Modal
          centered
          open={openPrescriptionModal}
          onCancel={() => setOpenPrescriptionModal(false)}
          title="Doctor Details"
          subtitle="This is the current role of the selected user"
          confirmLabel="Close"
          footer={[
            <Button
              key="approve"
              type="default"
              variant="outlined"
              danger={userData?.doctorApplicationStatus == "approved"}
              onClick={() => handleUserClick(userData?.doctorApplicationStatus)}
            >
              {userData?.doctorApplicationStatus === "cancelled"
                ? "Approved"
                : userData?.doctorApplicationStatus === "pending"
                ? "Approved"
                : "Cancel"}
            </Button>,

            <Button key="back" onClick={() => setOpenPrescriptionModal(false)}>
              Close
            </Button>,
          ]}
        >
          <div className="flex flex-col gap-3 py-3 justify-center items-center">
            <Image
              className="rounded-full h-32 w-32"
              src={
                userData?.image
                  ? imageUrl + userData?.image
                  : require("../../../../../../public/images/avatar.png")
              }
              width={200}
              height={200}
              alt="avatar"
            />
            <Text
              strong
              className="text-xl text-center font-bold text-gray-600"
            >
              {userData?.name}
            </Text>
            <h1 className="text-sm font-bold text-gray-400">
              {userData?.email}
            </h1>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-400">Information</h1>
            <h1 className="text-sm  text-gray-500">
              Consultation Upcoming : {userData?.totalConsultationUpcoming}
            </h1>
            <h1 className="text-sm  text-gray-500">
              Consultation History : {userData?.totalConsultationHistory}
            </h1>
          </div>
          <Divider />
          <div>
            <h1 className="text-sm font-bold text-gray-400">Doctor Status</h1>
            <Tag
              color={
                userData?.doctorApplicationStatus === "approved"
                  ? "green"
                  : userData?.doctorApplicationStatus === "pending"
                  ? "orange"
                  : "red"
              }
            >
              {userData?.doctorApplicationStatus}
            </Tag>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Doctor;
