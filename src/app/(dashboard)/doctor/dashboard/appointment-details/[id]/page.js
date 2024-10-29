"use client";

import { Button, Card, Form, Input, Space } from "antd";
import { ChevronLeft, MinusIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { PlusCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { imageUrl } from "../../../../../../../redux/api/baseApi";
import { useGetAppointmentByIdQuery } from "../../../../../../../redux/apiSlices/appointmentsSlices";
import { useAddNoteMutation } from "../../../../../../../redux/apiSlices/notesSlices";
import { useAddPrescriptionMutation } from "../../../../../../../redux/apiSlices/prescriptionSlices";

const AppointmentDetails = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [noteForm] = Form.useForm();
  const [prescriptionForm] = Form.useForm();
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
    navigate.push("/dashboard/appointment");
  };

  const handleUpdate = async () => {
    console.log(content);
    Swal.fire({
      position: "top", // Use valid SweetAlertPosition
      icon: "success", // Use valid SweetAlertIcon
      showConfirmButton: false,
      timer: 1500,
    });
    // navigate("/settings/termsAndCondition");

    // try {
    //   const response = await setData({
    //     content: content,
    //   });

    //   if (response?.data?.statusCode === 201) {
    //     Swal.fire({
    //       position: "top-center",
    //       icon: "success",
    //       title: response?.data?.message,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     navigate("/settings/terms-conditions");
    //   }
    // } catch (error: any) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Try Again...",
    //     text: error?.response?.data?.message || "An error occurred",
    //     footer: '<a href="#">Why do I have this issue?</a>',
    //   });
    // }
  };

  const [addNote] = useAddNoteMutation();
  const [addPrescription] = useAddPrescriptionMutation();

  const handleNoteSubmit = async (values) => {
    console.log(values);

    values?.notes?.forEach(async (note) => {
      const res = await addNote({
        appointmentId: Appointments?.data?._id,
        ...note,
      });
      console.log(res);
      if (res.data) {
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });
        setOpenModal(false);
        noteForm.resetFields(); // Reset form fields after submission
      }
    });
  };
  const handlePrescriptionSubmit = async (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (Appointments?.data?.notes) {
      noteForm.setFieldsValue({
        notes: Appointments?.data?.notes,
      });
    }
  }, [Appointments]);

  return (
    <div>
      <div className="flex justify-between gap-3 items-center w-full">
        <div onClick={handleBack} className="flex cursor-pointer">
          <ChevronLeft />
          <h1>Patient Profile</h1>
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
              className="w-24 h-24 rounded mx-auto"
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
            <Button
              type="text"
              onClick={() => {
                noteForm.setFieldsValue({
                  notes: [
                    ...(noteForm.getFieldValue("notes") || []), // Ensure notes is an array
                    {
                      title: "",
                      content: "",
                    },
                  ],
                });
              }}
              icon={<PlusCircleOutlined />}
            >
              Add Note
            </Button>
          </div>
          <Form form={noteForm} onFinish={handleNoteSubmit} className="w-full">
            <Form.List name="notes">
              {(fields, { add, remove }) => (
                <Space direction="vertical" style={{ width: "100%" }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      key={key}
                      bordered
                      style={{
                        marginBottom: "16px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        padding: "16px",
                        position: "relative",
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        rules={[
                          { required: true, message: "Please input title" },
                        ]}
                      >
                        <Input placeholder="Title" style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "content"]}
                        rules={[
                          { required: true, message: "Please input content" },
                        ]}
                      >
                        <Input.TextArea placeholder="Content" rows={4} />
                      </Form.Item>
                      <Button
                        danger
                        type="text"
                        icon={<MinusIcon />}
                        size="small"
                        onClick={() => remove(name)}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          zIndex: 1,
                        }}
                      >
                        Remove
                      </Button>
                    </Card>
                  ))}
                  {fields?.length > 0 && (
                    <Form.Item
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        className="h-10 bg-primary6 text-white"
                        type="text"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  )}
                </Space>
              )}
            </Form.List>
          </Form>
        </div>
        <div className="bg-white p-3 rounded-lg ">
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-lg text-gray-600 py-3">Prescription</h1>
            <Button
              type="text"
              onClick={() => {
                prescriptionForm.setFieldsValue({
                  prescriptions: [
                    ...(prescriptionForm.getFieldValue("prescriptions") || []), // Ensure notes is an array
                    {
                      title: "",
                      content: "",
                    },
                  ],
                });
              }}
              icon={<PlusCircleOutlined />}
            >
              Add Prescription
            </Button>
          </div>
          <Form
            form={prescriptionForm}
            onFinish={handlePrescriptionSubmit}
            className="w-full"
          >
            <Form.List name="prescriptions">
              {(fields, { add, remove }) => (
                <Space direction="vertical" style={{ width: "100%" }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      key={key}
                      bordered
                      style={{
                        marginBottom: "16px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        padding: "16px",
                        position: "relative",
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        rules={[
                          { required: true, message: "Please input title" },
                        ]}
                      >
                        <Input placeholder="Title" style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "content"]}
                        rules={[
                          { required: true, message: "Please input content" },
                        ]}
                      >
                        <Input.TextArea placeholder="Content" rows={4} />
                      </Form.Item>
                      <Button
                        danger
                        type="text"
                        icon={<MinusIcon />}
                        size="small"
                        onClick={() => remove(name)}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          zIndex: 1,
                        }}
                      >
                        Remove
                      </Button>
                    </Card>
                  ))}
                  {fields?.length > 0 && (
                    <Form.Item
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        type="text"
                        className="h-10 bg-primary6 text-white"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  )}
                </Space>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
