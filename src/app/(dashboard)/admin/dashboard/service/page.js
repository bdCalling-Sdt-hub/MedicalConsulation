"use client";

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
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MinusCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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

import ModalComponent from "../../../../../components/dashboard/share/ModalComponent";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { extractDateTimeParts } from "../../../../../utils/extractDateTimeParts";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Text } = Typography;

function CreteServices({ title, titleStyle, containerBg }) {
  const [selectedItem, setSelectedItem] = useState(null); // State to store only one selected item
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Ant Design form instance

  // Function to handle form submission
  const [createService] = useAddServiceMutation();
  const [deleteService] = useDeletedServiceMutation();
  const [updateService] = useUpdateServiceByIdMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdatedModal, setOpenUpdatedModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");

  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);

  const pageSize = 10;

  const { data: Services } = useGetAllServicesQuery({
    page: 1,
    limit: 10,
    search: "",
  });

  const data = Services?.data?.map((item, index) => ({
    sId: item?._id,
    title: item?.title,
    daysOfWeek: item?.daysOfWeek,
    dateTimes: item?.dateTimes,
    consultationType: item?.consultationType,
    price: item?.price,
    status: item?.status,
    duration: item?.duration,
    details: "Details",
    // rating: index % 5 + 1, // Generate rating between 1 and 5
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Slots",
      dataIndex: "dateTimes",
      key: "dateTimes",
      render: (_, record) => (
        <div className="flex-col flex w-40 gap-4">
          {record?.dateTimes?.map((item, index) => (
            <Text type="warning" keyboard key={index}>
              <span className=" ">
                {extractDateTimeParts(item, true, true).time}{" "}
                {extractDateTimeParts(item, true, true).timeOfDay}
              </span>
            </Text>
          ))}
        </div>
      ),
    },
    {
      title: "Days Of Week",
      dataIndex: "daysOfWeek",
      key: "daysOfWeek",
      render: (_, record) => (
        <div className="flex gap-2 flex-wrap">
          {record?.daysOfWeek?.map((item, index) => (
            <Text keyboard type="secondary" key={index}>
              {item?.toUpperCase()}
            </Text>
          ))}
        </div>
      ),
    },
    {
      title: "ConsultationType",
      dataIndex: "consultationType",
      key: "consultationType",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Prescription",
      dataIndex: "details",
      key: "details",
      render: (_, record) => (
        <div>
          <Button
            icon={<EyeFilled />}
            onClick={() => handleView(record)}
            type="secondary"
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleUpdated(record)}
            type="secondary"
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            type="secondary"
            danger
          >
            Delete
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

  const route = useRouter();

  const handleCreateService = async (values) => {
    console.log(values);
    const submissionData = {
      title: values.title,
      price: values.price.toString(), // Ensure price is in string format
      dateTimes: values?.dateTimes?.map((slot) =>
        new Date(slot?.date?.toISOString()).toISOString()
      ), // Map slot dates to ISO format
      consultationType: values.serviceType, // Rename serviceType if needed
      duration: values.duration, // Static value if needed, or fetch from form if dynamic
    };

    const res = await createService(submissionData);
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      setIsModalOpen(false);
      form.resetFields(); // Reset form fields after submission
    }
  };
  const handleUpdateService = async (values) => {
    console.log(values);
    const submissionData = {
      title: values.title,
      price: values.price.toString(), // Ensure price is in string format
      dateTimes: values?.dateTimes?.map((slot) =>
        new Date(slot?.date?.toISOString()).toISOString()
      ), // Map slot dates to ISO format
      consultationType: values.serviceType, // Rename serviceType if needed
      duration: values.duration, // Static value if needed, or fetch from form if dynamic
    };

    const res = await updateService({
      id: values?.sId,
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
    console.log(recoded);
    recoded.dateTimes = recoded?.dateTimes?.map((slot) => ({
      ...slot,
      date: dayjs(slot), // Convert from ISO string to Date object
    }));
    form.setFieldsValue(recoded);
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
    deleteService(selectedItem?.sId).then((res) => {
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
      approveService(selectedItem?.sId).then((res) => {
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
      disableService(selectedItem?.sId).then((res) => {
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
      enableService(selectedItem?.sId).then((res) => {
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
      cancelService(selectedItem?.sId).then((res) => {
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
      <div className="flex flex-col items-end py-2">
        <Button
          type="text"
          className="h-12 bg-primary6 text-white"
          onClick={showModal}
        >
          Add Service
        </Button>
      </div>

      {/* Modal for creating a new service */}
      <Modal
        title="Create New Service"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateService}>
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

          <Form.List name="dateTimes">
            {(fields, { add, remove }) => (
              <div className="flex-col gap-4">
                {fields.map(({ key, name, ...restField }, index) => (
                  <Form.Item
                    {...restField}
                    key={key}
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
                      value={Slots[index]?.date}
                      className="w-full bg-white rounded mb-4 border border-primary6"
                      picker="date"
                      onChange={(e) => {
                        console.log({ e });
                      }}
                      showTime
                      timeFormat="HH:mm"
                      format="YYYY-MM-DD HH:mm"
                      clearIcon={false}
                      size="large"
                    />
                    {/* remove button for each slot */}
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      className="cursor-pointer"
                    />
                  </Form.Item>
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
              Create
            </Button>
          </div>
        </Form>
        {/* udpated services table */}
      </Modal>

      {/* Modal for updating a service */}
      <Modal
        title="Create New Service"
        open={openUpdatedModal}
        onCancel={handleUpdateCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateService}>
          <Form.Item name="sId" label="sId" style={{ display: "none" }}>
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
              variant="solid"
              type="default"
            >
              Disable
            </Button>
            <Button
              onClick={() => handleStatusChange("enabled")}
              variant="solid"
              type="default"
            >
              Enable
            </Button>
            <Button
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
            </Button>
          </div>
        </div>
      </Modal>

      <div className="py-8">
        <Table
          dataSource={data}
          sortDirections="descend"
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

export default CreteServices;
