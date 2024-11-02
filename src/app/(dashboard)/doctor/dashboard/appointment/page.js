"use client";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  StopFilled,
} from "@ant-design/icons";
import { Button, Input, Table, Tag, Typography } from "antd";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAppointmentDoctorByIdQuery } from "../../../../../../redux/apiSlices/appointmentsSlices";
import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";
import SelectBox from "../../../../../components/dashboard/share/SelectBox";
import { extractDateTimeParts } from "../../../../../utils/extractDateTimeParts";

const selectOptions = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const { Text } = Typography;

const Appointment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState();
  const [role, setRole] = useState();
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const user = useSelector((state) => state.user.user);
  console.log(user?._id);
  const { data: doctorAppointments } = useGetAppointmentDoctorByIdQuery({
    page: currentPage,
    limit: 10,
  });
  console.log(doctorAppointments);

  const route = useRouter(); // Import useNavigate hook

  const pageSize = 10;

  const handleView = (recoded) => {
    console.log(recoded);
    route.push(`/doctor/dashboard/appointment-details/${recoded?._id}`);
  };

  const columns = [
    {
      title: "Patient Email",
      dataIndex: "patientEmail",
      key: "patientEmail",
      render: (_, record) => (
        <div className="flex gap-2  justify-center items-center">
          {record?.patientEmail ? (
            <Text copyable className="flex gap-2 flex-wrap text-center">
              {record?.patientEmail}
            </Text>
          ) : (
            <Text className="text-gray-400 text-xs">Empty</Text>
          )}
        </div>
      ),
    },
    {
      title: "Slots",
      dataIndex: "dateTimes",
      key: "dateTimes",
      render: (_, record) => (
        <div className="flex-col flex w-40 gap-4">
          <Tag className="text-center" color="blue" type="secondary">
            <span className=" ">
              {extractDateTimeParts(record?.dateTime, true, true).time}{" "}
              {extractDateTimeParts(record?.dateTime, true, true).timeOfDay}
            </span>
          </Tag>
        </div>
      ),
    },
    {
      title: "Days Of Week",
      dataIndex: "daysOfWeek",
      key: "daysOfWeek",
      render: (_, record) => (
        <div className="flex gap-2 flex-wrap">
          <Tag type="secondary" color="success">
            {record?.dayOfWeek?.toUpperCase()}
          </Tag>
        </div>
      ),
    },

    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => (
        <div className="w-24">
          <Button
            icon={
              record?.paymentStatus === "paid" ? (
                <CheckCircleOutlined />
              ) : record?.paymentStatus === "pending" ? (
                <ClockCircleOutlined />
              ) : (
                <StopFilled />
              )
            }
            variant="text"
            type="text"
            className={`${
              record?.paymentStatus === "paid"
                ? "text-green-500"
                : record?.paymentStatus === "pending"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {record?.paymentStatus}
          </Button>
        </div>
      ),
    },
    {
      title: "Public Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div className="w-24">
          <Button
            icon={
              record?.status === "completed" ? (
                <CheckCircleOutlined />
              ) : record?.status === "upcoming" ? (
                <ClockCircleOutlined />
              ) : (
                <StopFilled />
              )
            }
            variant="text"
            type="text"
            className={`${
              record?.status === "upcoming"
                ? "text-yellow-500"
                : record?.status === "completed"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {record?.status}
          </Button>
        </div>
      ),
    },
    {
      title: "Zoom Link",
      dataIndex: "zoomLink",
      key: "zoomLink",
      render: (_, record) => (
        <div className="flex flex-col gap-2 items-start w-24">
          {record?.zoomLink ? (
            <Text
              type="secondary"
              copyable={{
                text: record?.zoomLink,
                onCopy: () => {
                  message.success("Link Copied");
                },
              }}
              role="link"
              className="text-[#71717A]"
            >
              <Link href={record?.zoomLink}>
                {record?.zoomLink?.slice(0, 20)}
              </Link>
            </Text>
          ) : (
            <span className="text-gray-400 text-xs">Empty</span>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "details",
      key: "details",
      render: (_, record) => (
        <div>
          <Button onClick={() => handleView(record)} type="default">
            View
          </Button>
        </div>
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

  const handleUser = (record) => {
    // Use the navigate function to redirect to the appointment/patientProfile with the ID
    route.push(`/doctor/dashboard/patient-profile/${record?._id}`);
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
            placeholder="Filter by status"
            options={selectOptions}
            onChange={handleSelectChange}
            style={{ width: 150 }}
          />
        </div>
      </div>
      <div className="py-6">
        <Table
          dataSource={doctorAppointments?.data?.result}
          columns={columns}
          pagination={{
            pageSize,
            total: doctorAppointments?.data?.total,
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
