"use client";

import {
  EditOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Empty,
  Form,
  Input,
  Modal,
  Space,
  Typography,
} from "antd";
import {
  useAddNoteMutation,
  useEditNoteMutation,
} from "../../../../../../../redux/apiSlices/notesSlices";
import {
  useAddPrescriptionMutation,
  useEditPrescriptionMutation,
} from "../../../../../../../redux/apiSlices/prescriptionSlices";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { imageUrl } from "../../../../../../../redux/api/baseApi";
import { useGetAppointmentByIdQuery } from "../../../../../../../redux/apiSlices/appointmentsSlices";

const { Title, Text } = Typography;

const AppointmentDetails = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [editNoteModalOpen, setEditNoteModalOpen] = useState(false);
  const [prescriptionModalOpen, setPrescriptionNoteModalOpen] = useState(false);
  const [editPrescriptionModalOpen, setEditPrescriptionModalOpen] =
    useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [noteForm] = Form.useForm();
  const [prescriptionForm] = Form.useForm();
  const [selectNoteData, setSelectNoteData] = useState(null);
  const [selectPrescriptionData, setSelectPrescriptionData] = useState(null);

  const [type, setType] = useState("");
  const pageSize = 3;

  const [selectedValue, setSelectedValue] = useState();

  // console.log(props);

  const { data: Appointments } = useGetAppointmentByIdQuery(props.params.id);

  console.log(Appointments);

  const [content, setContent] = useState("");

  // React chart section

  const navigate = useRouter();
  const handleBack = () => {
    navigate.push("/doctor/dashboard/appointment");
  };

  const [addNote] = useAddNoteMutation();
  const [editNote] = useEditNoteMutation();
  const [addPrescription] = useAddPrescriptionMutation();
  const [editPrescription] = useEditPrescriptionMutation();

  const handleNoteSubmit = async (values) => {
    // console.log(values);

    const res = await addNote({
      appointmentId: Appointments?.data?._id,
      ...values,
    });
    // console.log(res);
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      noteForm.resetFields(); // Reset form fields after submission
      setNoteModalOpen(false);
    }
  };
  const handlePrescriptionSubmit = async (values) => {
    console.log(values);

    const res = await addPrescription({
      appointmentId: Appointments?.data?._id,
      ...values,
    });
    console.log(res);
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      prescriptionForm.resetFields(); // Reset form fields after submission
      setPrescriptionNoteModalOpen(false);
    }
  };

  const handleEditNoteSubmit = async (values) => {
    console.log(values);
    const res = await editNote({
      id: values?._id,
      data: values,
    });
    console.log(res);
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      setEditNoteModalOpen(false);
      noteForm.resetFields();
    }
  };

  const handleEditPrescriptionSubmit = async (values) => {
    console.log(values);
    const res = await editPrescription({
      id: values?._id,
      data: values,
    });
    console.log(res);
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      setEditPrescriptionModalOpen(false);
      prescriptionForm.resetFields();
      // Reset form fields after submission
    }
  };

  const handleCancel = () => {
    setNoteModalOpen(false);
    setEditNoteModalOpen(false);
    setPrescriptionNoteModalOpen(false);
    setEditPrescriptionModalOpen(false);
    setOpenDeleteModal(false);
    noteForm.resetFields();
    prescriptionForm.resetFields();
  };

  const noteModalClicked = () => {
    setNoteModalOpen(true);
  };

  const editNoteModalClicked = (note) => {
    noteForm.setFieldsValue(note);
    setEditNoteModalOpen(true);
  };

  const prescriptionNoteModalClicked = () => {
    setPrescriptionNoteModalOpen(true);
  };

  const prescriptionModalClicked = (prescription) => {
    prescriptionForm.setFieldsValue(prescription);
    setEditPrescriptionModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between gap-3 items-center w-full">
        <div onClick={handleBack} className="flex cursor-pointer">
          <ChevronLeft />
          <h1>Back</h1>
        </div>
        <div>
          <Button
            type="text"
            onClick={noteModalClicked}
            icon={<PlusCircleOutlined />}
          >
            Add Note
          </Button>
          <Button
            type="text"
            onClick={prescriptionNoteModalClicked}
            icon={<PlusCircleOutlined />}
          >
            Add Prescription
          </Button>
        </div>
      </div>
      <div className="flex gap-2  items-center justify-center mt-4">
        <div className="w-1/2 h-80 flex items-center justify-center py-8 bg-white rounded-2xl">
          <div className="mx-auto text-center items-center">
            <Image
              width={100}
              height={100}
              src={
                Appointments?.data?.patient?.image
                  ? imageUrl + Appointments?.data?.patient?.image
                  : require("../../../../../../../public/images/avatar.png")
              }
              className="w-24 h-24 rounded-full mx-auto"
              alt=""
            />
            <h1 className="text-xl font-bold py-2 text-gray-900">
              {Appointments?.data?.patient?.name}
            </h1>

            <p>{Appointments?.data?.patient?.email}</p>
          </div>
        </div>

        <div className=" h-80 w-1/2 py-4 justify-center bg-white rounded-2xl">
          <div className=" px-6">
            <div className="text-lg font-bold text-center">
              Personal Information
            </div>
            <div className="flex-col  gap-24 items-center justify-center  ">
              <div>
                <h1 className="mt-6">Name</h1>
                <p className=" border-b border-gray-200 font-bold">
                  {Appointments?.data?.patient?.name}
                </p>
                <h1 className="mt-6">Phone Number</h1>
                <p className="mt-2 border-b border-gray-200 font-bold">
                  {Appointments?.data?.patient?.phone}
                </p>
              </div>
              <div>
                <h1 className="mt-6">Email</h1>
                <p className="mt-2 border-b border-gray-200 font-bold">
                  {Appointments?.data?.patient?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg ">
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-lg text-gray-600 py-3">Notes</h1>
          </div>
          {Appointments?.data?.notes?.length > 0 ? (
            <>
              {Appointments?.data?.notes?.map((note, index) => (
                <Space
                  key={index}
                  direction="vertical"
                  style={{ width: "100%" }}
                >
                  <Card
                    bordered
                    hoverable
                    style={{
                      marginBottom: "16px",
                      borderRadius: "10px",
                      padding: "20px",
                      position: "relative",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                      transition: "transform 0.2s",
                    }}
                    bodyStyle={{ padding: 0 }}
                  >
                    {/* Edit button in top-right corner */}
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        color: "#1890ff",
                      }}
                      onClick={() => editNoteModalClicked(note)} // Replace with actual edit handler
                    />
                    <Title
                      level={5}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                        color: "#333",
                      }}
                    >
                      <InfoCircleOutlined
                        style={{
                          marginRight: "10px",
                          color: "#1890ff",
                          fontSize: "18px",
                        }}
                      />
                      {note?.title}
                    </Title>
                    <Divider
                      style={{
                        margin: "8px 0",
                        borderTop: "1px solid #e0e0e0",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: "16px",
                        color: "#595959",
                        lineHeight: "1.7",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {note?.content}
                    </Text>
                  </Card>
                </Space>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
        <div className="bg-white p-3 rounded-lg ">
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-lg text-gray-600 py-3">Prescription</h1>
          </div>
          {Appointments?.data?.prescription?.length > 0 ? (
            <>
              {Appointments?.data?.prescription?.map((item, index) => (
                <Space
                  key={index}
                  direction="vertical"
                  style={{ width: "100%" }}
                >
                  <Card
                    bordered
                    hoverable
                    style={{
                      marginBottom: "16px",
                      borderRadius: "10px",
                      padding: "20px",
                      position: "relative",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                      transition: "transform 0.2s",
                    }}
                    bodyStyle={{ padding: 10 }}
                  >
                    {/* Edit button in top-right corner */}
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        color: "#1890ff",
                      }}
                      onClick={() => prescriptionModalClicked(item)} // Replace with actual edit handler
                    />
                    <Title
                      level={5}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                        color: "#333",
                      }}
                    >
                      <InfoCircleOutlined
                        style={{
                          marginRight: "10px",
                          color: "#1890ff",
                          fontSize: "18px",
                        }}
                      />
                      {item?.title}
                    </Title>
                    <Divider
                      style={{
                        margin: "8px 0",
                        borderTop: "1px solid #e0e0e0",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: "16px",
                        color: "#595959",
                        lineHeight: "1.7",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item?.content}
                    </Text>
                  </Card>
                </Space>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Add Note"
        open={noteModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={noteForm}
          onFinish={handleNoteSubmit}
          className="w-full pt-3"
        >
          <Form.Item
            name={"title"}
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input className="h-12" placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={"content"}
            rules={[{ required: true, message: "Please input content" }]}
          >
            <Input.TextArea placeholder="Content" rows={4} />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              className="h-10 bg-primary6 text-white"
              type="text"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Note"
        open={editNoteModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={noteForm}
          onFinish={handleEditNoteSubmit}
          className="w-full pt-3"
        >
          <Form.Item name={"_id"} style={{ display: "none" }}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"title"}
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input className="h-12" placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={"content"}
            rules={[{ required: true, message: "Please input content" }]}
          >
            <Input.TextArea placeholder="Content" rows={4} />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              className="h-10 bg-primary6 text-white"
              type="text"
              htmlType="submit"
            >
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Prescription"
        open={prescriptionModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={noteForm}
          onFinish={handlePrescriptionSubmit}
          className="w-full pt-3"
        >
          <Form.Item
            name={"title"}
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input className="h-12" placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={"content"}
            rules={[{ required: true, message: "Please input content" }]}
          >
            <Input.TextArea placeholder="Content" rows={4} />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              className="h-10 bg-primary6 text-white"
              type="text"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Prescription"
        open={editPrescriptionModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={prescriptionForm}
          onFinish={handleEditPrescriptionSubmit}
          className="w-full pt-3"
        >
          <Form.Item name={"_id"} style={{ display: "none" }}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"title"}
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input className="h-12" placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={"content"}
            rules={[{ required: true, message: "Please input content" }]}
          >
            <Input.TextArea placeholder="Content" rows={4} />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              className="h-10 bg-primary6 text-white"
              type="text"
              htmlType="submit"
            >
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AppointmentDetails;
