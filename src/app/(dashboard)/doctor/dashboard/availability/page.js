"use client";

import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MinusOutlined,
  PlusOutlined,
  StopFilled,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  useAddServiceMutation,
  useApprovedServiceMutation,
  useCancelServicesMutation,
  useDeletedServiceMutation,
  useDisableServiceMutation,
  useEnableServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceByIdMutation,
} from "../../../../../../redux/apiSlices/servicesSlices";
import {
  useAddAvailabilityMutation,
  useDeletedAvailabilityMutation,
  useGetAvailabilityByDoctorIdQuery,
} from "../../../../../../redux/apiSlices/availabilitySlices";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAllDoctorQuery } from "../../../../../../redux/apiSlices/authSlice";
import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";
import { extractDateTimeParts } from "../../../../../utils/extractDateTimeParts";
import { useSelector } from "react-redux";
const { Text } = Typography;

function CreateAvailabilities() {
  const [selectedItem, setSelectedItem] = useState(null); // State to store only one selected item
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Ant Design form instance
  const userProfile = useSelector((state) => state.user?.user);

  // Function to handle form submission
  const [createService] = useAddServiceMutation();
  const [deleteService] = useDeletedServiceMutation();
  const [updateService] = useUpdateServiceByIdMutation();

  // create availibity
  const [createAvailability] = useAddAvailabilityMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdatedModal, setOpenUpdatedModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");

  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);

  const pageSize = 5;

  const { data: doctor } = useAllDoctorQuery({
    limit: 500,
  });

  const doctorSelectOptions = doctor?.data?.result?.map((item) => ({
    label: item?.name + " - " + item?.email,
    value: item?._id,
  }));

  const { data: Services } = useGetAllServicesQuery({
    page: currentPage,
    limit: pageSize,
    search: "",
  });

  const { data: Availability } = useGetAvailabilityByDoctorIdQuery(
    userProfile?._id
  );

  console.log("availability", Availability);

  // console.log("Services", Services);

  // console.log(Services, "services");
  // console.log("Current Page", currentPage);

  // const columns = [
  //   // {
  //   //   title: "Title",
  //   //   dataIndex: "title",
  //   //   key: "title",
  //   // },
  //   {
  //     title: "Date",
  //     dataIndex: "dateTimes",
  //     key: "date",
  //     render: (_, record) => (
  //       <div className="flex-col flex w-40 gap-4">
  //         {record?.dateTimes?.map((item, index) => (
  //           <Tag
  //             className="text-center"
  //             color="red"
  //             type="secondary"
  //             key={index}
  //           >
  //             <span key={index}>{dayjs(item.date).format("YYYY-MM-DD")}</span>
  //           </Tag>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Time Slots",
  //     dataIndex: "dateTimes",
  //     key: "dateTimes",
  //     render: (_, record) => (
  //       <div className="flex-col flex w-40 gap-4">
  //         {record?.dateTimes?.map((item, index) => (
  //           <Tag
  //             className="text-center"
  //             color="blue"
  //             type="secondary"
  //             key={index}
  //           >
  //             <span className=" ">
  //               {extractDateTimeParts(item, true, true).time}{" "}
  //               {extractDateTimeParts(item, true, true).timeOfDay}
  //             </span>
  //           </Tag>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   // {
  //   //   title: "Days Of Week",
  //   //   dataIndex: "daysOfWeek",
  //   //   key: "daysOfWeek",
  //   //   render: (_, record) => (
  //   //     <div className="flex gap-2 flex-wrap">
  //   //       {record?.daysOfWeek?.map((item, index) => (
  //   //         <Tag type="secondary" color="success" key={index}>
  //   //           {item?.toUpperCase()}
  //   //         </Tag>
  //   //       ))}
  //   //     </div>
  //   //   ),
  //   // },
  //   {
  //     title: "Days Of Week",
  //     dataIndex: "daysOfWeek",
  //     key: "daysOfWeek",
  //     render: (_, record) => {
  //       const daysOfWeek = record?.dateTimes?.map((item) =>
  //         dayjs(item.date).format("dddd")
  //       );
  //       const uniqueDays = Array.from(new Set(daysOfWeek));

  //       return (
  //         <div className="flex gap-2 flex-wrap">
  //           {uniqueDays.map((item, index) => (
  //             <Tag type="secondary" color="success" key={index}>
  //               {item.toUpperCase()}
  //             </Tag>
  //           ))}
  //         </div>
  //       );
  //     },
  //   },

  //   // {
  //   //   title: "Action",
  //   //   dataIndex: "details",
  //   //   key: "details",
  //   //   render: (_, record) => (
  //   //     <div>
  //   //       <Button
  //   //         icon={<EyeFilled />}
  //   //         onClick={() => handleView(record)}
  //   //         type="secondary"
  //   //       >
  //   //         View
  //   //       </Button>
  //   //       <Button
  //   //         icon={<EditOutlined />}
  //   //         onClick={() => handleUpdated(record)}
  //   //         type="secondary"
  //   //       >
  //   //         Edit
  //   //       </Button>
  //   //       <Button
  //   //         icon={<DeleteOutlined />}
  //   //         onClick={() => handleDelete(record)}
  //   //         type="secondary"
  //   //         danger
  //   //       >
  //   //         Delete
  //   //       </Button>
  //   //     </div>
  //   //   ),
  //   // },
  // ];

  const columns = [
    {
      title: "Date",
      dataIndex: "availableDate",
      key: "date",
      render: (_, record) => {
        const { startDateTime, endDateTime } = record.availableDate;

        // Check if the date is a range or a single value
        if (startDateTime && endDateTime && startDateTime !== endDateTime) {
          return (
            <div>
              <Tag color="red">
                From: {dayjs(startDateTime).format("YYYY-MM-DD")}
              </Tag>
              <Tag color="red">
                To: {dayjs(endDateTime).format("YYYY-MM-DD")}
              </Tag>
            </div>
          );
        }
        return (
          <Tag color="red">{dayjs(startDateTime).format("YYYY-MM-DD")}</Tag>
        );
      },
    },
    {
      title: "Time Slots",
      dataIndex: "availableDate",
      key: "timeSlots",
      render: (_, record) => {
        const { startDateTime, endDateTime } = record.availableDate;

        // Extract time slots
        const startTime = dayjs(startDateTime).format("HH:mm");
        const endTime = dayjs(endDateTime).format("HH:mm");

        return (
          <Tag color="blue">
            {startTime} - {endTime}
          </Tag>
        );
      },
    },
    {
      title: "Days",
      dataIndex: "availableDate",
      key: "days",
      render: (_, record) => {
        const { startDateTime, endDateTime } = record.availableDate;

        // Check if the date is a range or single value
        if (startDateTime && endDateTime && startDateTime !== endDateTime) {
          const startDay = dayjs(startDateTime).format("dddd");
          const endDay = dayjs(endDateTime).format("dddd");

          return (
            <div>
              <Tag color="green">From: {startDay}</Tag>
              <Tag color="green">To: {endDay}</Tag>
            </div>
          );
        }
        return <Tag color="green">{dayjs(startDateTime).format("dddd")}</Tag>;
      },
    },
  ];

  const route = useRouter();

  const handleCreateService = async (values) => {
    console.log("values", values);
    const { availableDate } = values;
    console.log("availableDate start", availableDate[0].toISOString());
    console.log("availableDate end", availableDate[1].toISOString());
    const { startDateTime, endDateTime } = availableDate || {};
    console.log("startDateTime", startDateTime);
    console.log("endDateTime", endDateTime);

    const payload = {
      availableDate: {
        startDateTime: availableDate[0].toISOString(),
        endDateTime: availableDate[1].toISOString(),
      },
      doctorId: userProfile._id,
    };
    const res = await createAvailability(payload);
    if (res.data) {
      Swal.fire({
        title: "Availability added!",
        text: "Availability has been added successfully!",
        icon: "success",
      });
      setIsModalOpen(false);
      form.resetFields(); // Reset form fields after submission
    }
    if (res.error) {
      Swal.fire({
        title: "Error",
        text: res?.error?.data?.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleUpdateService = async (values) => {
    console.log(values);
    const dateTimes = values?.dateTimes?.map((slot) =>
      new Date(slot?.date?.toISOString()).toISOString()
    );

    const submissionData = {
      ...values,
      dateTimes,
    };
    // console.log(submissionData, "submissionData updated");
    const res = await updateService({
      id: values?._id,
      data: submissionData,
    });
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      setOpenUpdatedModal(false);
      form.resetFields(); // Reset form fields after submission
    }
  };
  // Function to handle selecting an item

  // Function to open modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenUpdatedModal(false);
    setSelectedItem(null);
    setOpenDeleteModal(false);
    setOpenViewModal(false);
  };

  // Function to close modal
  const handleUpdateCancel = () => {
    setOpenUpdatedModal(false);
    form.resetFields();
  };

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handleUpdated = (recoded) => {
    const dateTimes = recoded?.dateTimes?.map((slot) => ({
      ...slot,
      date: dayjs(slot), // Convert from ISO string to Date object
    }));

    let Recoded = { ...recoded, doctorId: recoded?.doctor?._id, dateTimes };

    form.setFieldsValue(Recoded);
    setOpenUpdatedModal(true);
  };

  const handleDelete = (action) => {
    setSelectedItem(action);
    setOpenDeleteModal(true);
  };

  const confirmApprove = () => {
    console.log("Approved:", userData, role);
    setOpenModel(false);
  };

  const confirmDelete = () => {
    console.log("Deleted:", selectedItem);
    deleteService(selectedItem?._id).then((res) => {
      console.log(res);
      if (res?.data) {
        Swal.fire({
          title: "Success",
          text: res.data?.message,
          icon: "success",
          confirmButtonText: "OK",
        });
        setOpenDeleteModal(false);
      }
    });
  };

  const handleView = (recoded) => {
    console.log(recoded);
    setSelectedItem(recoded);
    setOpenViewModal(true);
  };
  const [disableService] = useDisableServiceMutation();
  const [enableService] = useEnableServiceMutation();
  const [approveService] = useApprovedServiceMutation();
  const [cancelService] = useCancelServicesMutation();
  const handleStatusChange = (status) => {
    console.log(selectedItem);
    if (status === "approved") {
      approveService(selectedItem?._id).then((res) => {
        console.log(res);
        if (res?.data) {
          Swal.fire({
            title: "Success",
            text: res.data?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          setOpenViewModal(false);
        }
      });
    } else if (status === "disabled") {
      disableService(selectedItem?._id).then((res) => {
        console.log(res);
        if (res?.data) {
          Swal.fire({
            title: "Success",
            text: res.data?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          setOpenViewModal(false);
        }
      });
    } else if (status === "enabled") {
      enableService(selectedItem?._id).then((res) => {
        console.log(res);
        if (res?.data) {
          Swal.fire({
            title: "Success",
            text: res.data?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          setOpenViewModal(false);
        }
      });
    } else if (status === "cancelled") {
      cancelService(selectedItem?._id).then((res) => {
        console.log(res);
        if (res?.data) {
          Swal.fire({
            title: "Success",
            text: res.data?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          setOpenViewModal(false);
        }
      });
    }
  };

  return (
    <>
      {/* Add Service Button */}
      <div className="flex justify-between">
        <h1 className="p-4 ">
          <span className="text-xl font-bold">Available timing</span>
        </h1>

        <div className="flex flex-col items-end py-2">
          <Button
            icon={<PlusOutlined />}
            type="text"
            size="small"
            className="h-10 bg-primary6 text-white"
            onClick={showModal}
          >
            Add Service
          </Button>
        </div>
      </div>

      {/* Modal for creating a new service */}
      <Modal
        title="Add your available timing"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateService}>
          <Form.Item
            label="Available Date"
            name="availableDate"
            rules={[
              { required: true, message: "Please select a date and time" },
            ]}
          >
            <DatePicker.RangePicker
              format="YYYY-MM-DD HH:mm"
              showTime
              // onChange={handleDateChange}
              // value={availableDate}
              onChange={(dates) => {
                const [startDateTime, endDateTime] = dates.map((date) =>
                  date.toISOString()
                );
                form.setFieldsValue({
                  availableDate: {
                    startDateTime,
                    endDateTime,
                  },
                });
              }}
            />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </div>
        </Form>
        {/* udpated services table */}
      </Modal>

      {/* Modal for updating a service */}
      <Modal
        title="Update Service"
        open={openUpdatedModal}
        onCancel={handleUpdateCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateService}>
          <Form.Item name="_id" label="_id" style={{ display: "none" }}>
            <Input placeholder="Enter service name" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please enter the service name" },
            ]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Service Price"
            rules={[
              { required: true, message: "Please enter the service price" },
            ]}
          >
            <InputNumber
              className="w-full bg-white rounded mb-4 border border-primary6"
              type="number"
              placeholder="Enter service price"
            />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Consultation Duration"
            rules={[
              { required: true, message: "Please enter the service price" },
            ]}
          >
            <InputNumber
              className="w-full bg-white rounded mb-4 border border-primary6"
              type="number"
              placeholder="duration in minutes"
            />
          </Form.Item>

          <Form.Item
            name="consultationType"
            label="Service Type"
            rules={[
              { required: true, message: "Please select a service type" },
            ]}
          >
            <Select
              placeholder="Select type of service"
              style={{ flex: 1 }}
              className="w-full bg-white rounded mb-4 border border-primary6"
              options={[
                { value: "video", label: "Video" },
                { value: "audio", label: "Audio" },
              ]}
            />
          </Form.Item>

          <Form.Item name="doctorId" label="Assign Doctor">
            <Select
              showSearch
              placeholder="doctor"
              style={{ flex: 1 }}
              className="w-full bg-white rounded mb-4 border border-primary6"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={doctorSelectOptions}
            />
          </Form.Item>

          <Form.List name="dateTimes">
            {(fields, { add, remove }) => (
              <div className="flex-col gap-4 ">
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key} className="flex items-center gap-2">
                    <Form.Item
                      {...restField}
                      name={[name, "date"]}
                      label={`Slot ${index + 1}`}
                      rules={[
                        {
                          required: true,
                          message: "Please select a date and time",
                        },
                      ]}
                    >
                      <DatePicker
                        picker="date"
                        onChange={(e) => {
                          console.log(e ? e.toISOString() : null);
                        }}
                        showTime
                        timeFormat="HH:mm"
                        format="YYYY-MM-DD HH:mm"
                        clearIcon={false}
                        size="large"
                      />
                    </Form.Item>
                    <Button
                      type="link"
                      onClick={() => remove(name)}
                      danger
                      icon={<MinusOutlined />}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  type="dashed"
                  size="middle"
                >
                  Add Slot
                </Button>
              </div>
            )}
          </Form.List>

          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Updated
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal for View a service */}
      <Modal
        title="Create New Service"
        open={openViewModal}
        onCancel={handleCancel}
        onClose={handleCancel}
        footer={null}
      >
        <div className="space-y-4">
          <div>
            <Text strong>Title:</Text>
            <div className="w-full bg-white rounded mb-4  p-2">
              <Text className="text-gray-600"> {selectedItem?.title}</Text>
            </div>
          </div>

          <div>
            <Text strong>Service Price:</Text>
            <div className="w-full bg-white rounded mb-4  p-2">
              <Text className="text-gray-600">{selectedItem?.price}</Text>
            </div>
          </div>

          <div>
            <Text strong>Consultation Duration:</Text>
            <div className="w-full bg-white rounded mb-4  p-2">
              <Text className="text-gray-600">
                {selectedItem?.duration ? selectedItem?.duration : 0}
              </Text>
            </div>
          </div>

          <div>
            <Text strong>Service Type:</Text>
            <div className="w-full bg-white rounded mb-4  p-2">
              <Text className="text-gray-600">
                {selectedItem?.consultationType}
              </Text>
            </div>
          </div>

          <Divider />

          <div className="flex-col gap-4 space-y-2">
            {selectedItem?.dateTimes.map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Text strong className="w-20">{`Slot ${index + 1}`}</Text>
                <div className="w-full bg-white rounded mb-4  p-2">
                  <Text className="text-gray-600">
                    {extractDateTimeParts(_)?.date}
                    {" - "}
                    {extractDateTimeParts(_)?.time}
                  </Text>
                </div>
              </div>
            ))}
          </div>

          <Divider />
          {/* show status here */}
          <div>
            <Text strong>Service Status:</Text>
            <div className="w-full bg-white rounded mb-4  p-2">
              <Text className="text-gray-600">{selectedItem?.status}</Text>
            </div>
          </div>
          <Divider />

          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              onClick={() => handleStatusChange("disabled")}
              icon={<StopFilled />}
              variant="solid"
              type="default"
              color={"danger"}
            >
              Disable
            </Button>
            <Button
              onClick={() => handleStatusChange("enabled")}
              icon={<CheckCircleOutlined />}
              className="text-green-500"
            >
              Enable
            </Button>
            {/* <Button
              onClick={() => handleStatusChange("approved")}
              variant="solid"
              type="default"
            >
              Approve
            </Button>
            <Button
              onClick={() => handleStatusChange("declined")}
              variant="solid"
              type="default"
            >
              Decline
            </Button> */}
          </div>
        </div>
      </Modal>

      <div className="py-8">
        <Table
          dataSource={Availability?.data}
          sortDirections="descend"
          columns={columns}
          // pagination={{
          //   pageSize,
          //   total: Services?.data?.count,
          //   current: currentPage,
          //   onChange: handlePage,
          // }}
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
          danger
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
    </>
  );
}

export default CreateAvailabilities;
