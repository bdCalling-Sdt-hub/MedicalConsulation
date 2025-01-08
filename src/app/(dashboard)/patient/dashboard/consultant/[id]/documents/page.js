"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
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
  Table,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
// import {
//   useAddNoteMutation,
//   useEditNoteMutation,
// } from "../../../../../redux/apiSlices/notesSlices";
import {
  useAddNoteMutation,
  useEditNoteMutation,
} from "../../../../../../../../redux/apiSlices/notesSlices";
import {
  useAddPrescriptionMutation,
  useEditPrescriptionMutation,
  useDownloadPrescriptionMutation,
} from "../../../../../../../../redux/apiSlices/prescriptionSlices";
import { createRoot } from "react-dom/client"; // Import createRoot for React 18+
import { InfoCircleOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { imageUrl } from "../../../../../../../../redux/api/baseApi";

import {
  useGetAppointmentByIdQuery,
  useGetAllDocumentsByAppointmentIdQuery,
  useDeleteDocumentByAppointmentIdMutation,
} from "../../../../../../../../redux/apiSlices/appointmentsSlices";
import { PDFRenderer } from "@react-pdf/renderer";
// Dynamic import for JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Title, Text } = Typography;
// Define columns for the document table

const AppointmentDetails = (props) => {
  const [documents, setDocuments] = useState([]);
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
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const componentRef = useRef();
  const { data: documentsData } = useGetAllDocumentsByAppointmentIdQuery(
    props.params.id
  );
  const [deleteDocumentByAppointmentId] =
    useDeleteDocumentByAppointmentIdMutation();

  // Effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
    if (documentsData?.success) {
      setDocuments(
        documentsData?.data?.map((doc, index) => ({
          key: index,
          documentName: doc.split("\\").pop(), // Extract file name from full path
          url: doc, // Store the full URL for deletion
        }))
      );
    }
  }, [documentsData]);

  // Handle delete document
  const handleDelete = (key) => {
    const documentToDelete = documents.find((doc) => doc.key === key);

    Modal.confirm({
      title: `Delete document: ${documentToDelete.documentName}?`,
      content: `Are you sure you want to delete this document? This action is irreversible.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        console.log("Deleting document:", documentToDelete);

        // Call the API to delete the document
        deleteDocumentByAppointmentId({
          id: props.params.id,
          data: { documentUrl: documentToDelete.url },
        })
          .unwrap()
          .then(() => {
            console.log("Document deleted successfully");
            // Remove the document from the state after deletion
            setDocuments(documents.filter((doc) => doc.key !== key));
          })
          .catch((error) => {
            console.log("Error deleting document:", error);
          });
      },
      onCancel: () => console.log("Delete cancelled"),
    });
  };

  const TestRef = useRef();

  const [type, setType] = useState("");
  const pageSize = 3;

  const [selectedValue, setSelectedValue] = useState();

  // console.log(props);

  const { data: Appointments } = useGetAppointmentByIdQuery(props.params.id);

  console.log("props.params.id", props.params.id);
  console.log("documentsData", documentsData);

  console.log(Appointments);

  const [content, setContent] = useState("");

  // React chart section

  const navigate = useRouter();
  const handleBack = () => {
    navigate.push("/patient/dashboard/consultant");
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
      appointmentId: Appointments?.data?.patient?._id,
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

  const handleDocumentClick = () => {
    console.log("handleDocumentClick");
  };

  const url = new URL(window.location.href);
  const path = url.pathname;
  console.log("url", url);
  console.log("path", path);

  const columns = [
    {
      title: "Document Name",
      dataIndex: "documentName",
      key: "documentName",
      render: (text) => <span>{text}</span>, // Display the document name
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)} // Trigger delete on click
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div ref={TestRef}>
      <div className="flex justify-between gap-3 items-center w-full">
        <div onClick={handleBack} className="flex cursor-pointer">
          <ChevronLeft />
          <h1>Back</h1>
        </div>
        <div>
          <Button
            onClick={() =>
              // handleDocumentClick(record)
              handleDocumentClick()
            }
            type="default"
          >
            Documents
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg ">
          <Table
            columns={columns}
            dataSource={documents}
            rowKey="key"
            pagination={false}
            bordered
          />
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
    </div>
  );
};

export default AppointmentDetails;
