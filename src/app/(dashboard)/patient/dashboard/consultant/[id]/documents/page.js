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
  useAddDocumentByAppointmentIdMutation,
  useGetAllDocumentsByAppointmentIdByDoctorQuery,
} from "../../../../../../../../redux/apiSlices/appointmentsSlices";
import { PDFRenderer } from "@react-pdf/renderer";
// Dynamic import for JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Title, Text } = Typography;
// Define columns for the document table

const AppointmentDetails = (props) => {
  const [documents, setDocuments] = useState([]);
  const [documentsByDoctorState, setDocumentsByDoctorState] = useState([]);
  const [files, setFiles] = useState(null);
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
  const { data: documentsDataByDoctor } =
    useGetAllDocumentsByAppointmentIdByDoctorQuery(props.params.id);
  // console.log("documentsDataByDoctor", documentsDataByDoctor);
  const [deleteDocumentByAppointmentId] =
    useDeleteDocumentByAppointmentIdMutation();

  const [addDocumentModalOpen, setAddDocumentModalOpen] = useState(false);

  const handleAddDocumentModalOpen = () => {
    setAddDocumentModalOpen(true);
  };
  const handleAddDocumentModalCancel = () => {
    setAddDocumentModalOpen(false);
  };

  // Effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
    if (documentsData?.success) {
      // setDocuments(
      //   documentsData?.data?.map((doc, index) => ({
      //     key: index,
      //     documentName: doc.split("\\").pop(), // Extract file name from full path
      //     // url: doc, // Store the full URL for deletion
      //     url: `${imageUrl}public/uploads/pdfs/${doc.split("\\").pop()}`, // Use base URL to create the correct link
      //   }))
      // );
      setDocuments(
        documentsData?.data?.map((doc, index) => ({
          key: index,
          documentName: doc.split("\\").pop(), // Extract file name
          url: `${imageUrl}public/uploads/pdfs/${doc.split("\\").pop()}`, // HTTP URL for display
          localPath: doc, // Full local file path for deletion
        }))
      );
    }
  }, [documentsData]);

  useEffect(() => {
    setIsMounted(true);
    if (documentsDataByDoctor?.success) {
      setDocumentsByDoctorState(
        documentsDataByDoctor?.data?.map((doc, index) => ({
          key: index,
          documentName: doc.split("\\").pop(), // Extract file name
          url: `${imageUrl}public/uploads/pdfs/${doc.split("\\").pop()}`, // HTTP URL for display
          localPath: doc, // Full local file path for deletion
        }))
      );
    }
  }, [documentsDataByDoctor]);

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
          data: { documentUrl: documentToDelete.localPath },
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
  const handleDeleteDocumentOfDoctor = (key) => {
    const documentToDelete = documentsByDoctorState.find(
      (doc) => doc.key === key
    );

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
          data: { documentUrl: documentToDelete.localPath },
        })
          .unwrap()
          .then(() => {
            console.log("Document deleted successfully");
            // Remove the document from the state after deletion
            setDocumentsByDoctorState(
              documentsByDoctorState.filter((doc) => doc.key !== key)
            );
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

  const { data: Appointments } = useGetAppointmentByIdQuery(props.params.id);

  // console.log("props.params.id", props.params.id);
  // console.log("documentsData", documentsData);

  // console.log(Appointments);

  const [content, setContent] = useState("");

  const navigate = useRouter();
  const handleBack = () => {
    navigate.push("/patient/dashboard/consultant");
  };

  const [addDocumentToAppointment] = useAddDocumentByAppointmentIdMutation();

  const handleDocumentClick = () => {
    console.log("handleDocumentClick");
  };

  const url = new URL(window.location.href);
  const path = url.pathname;
  console.log("url", url);
  console.log("path", path);

  // const columns = [
  //   {
  //     title: "Document Name",
  //     dataIndex: "documentName",
  //     key: "documentName",
  //     render: (text) => <span>{text}</span>, // Display the document name
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text, record) => (
  //       <Button
  //         type="danger"
  //         icon={<DeleteOutlined />}
  //         onClick={() => handleDelete(record.key)} // Trigger delete on click
  //       >
  //         Delete
  //       </Button>
  //     ),
  //   },
  // ];

  const columns = [
    {
      title: "Document Name",
      dataIndex: "documentName",
      key: "documentName",
      render: (text, record) => (
        <a href={record.url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ), // Display the document name as a clickable link
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

  const columnsForDoctor = [
    {
      title: "Document Name",
      dataIndex: "documentName",
      key: "documentName",
      render: (text, record) => (
        <a href={record.url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ), // Display the document name as a clickable link
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
          <Button onClick={handleAddDocumentModalOpen} type="default">
            Add Documents
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg ">
          <Table
            title={() => "Documents Uploaded by Patient"}
            columns={columns}
            dataSource={documents}
            rowKey="key"
            pagination={false}
            bordered
          />
        </div>
        <div className="bg-white rounded-lg ">
          <Table
            title={() => "Documents Uploaded by Doctor"}
            columns={columnsForDoctor}
            dataSource={documentsByDoctorState}
            rowKey="key"
            pagination={false}
            bordered
          />
        </div>
      </div>
      <Modal
        title="Add Documents"
        open={addDocumentModalOpen}
        onCancel={handleAddDocumentModalCancel}
        footer={null}
      >
        <Form className="w-full pt-3">
          <Form.Item
            name={"document"}
            rules={[{ required: true, message: "Please upload document" }]}
          >
            <Input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              className="h-10 bg-primary6 text-white"
              type="text"
              htmlType="submit"
              onClick={async () => {
                if (!files) {
                  return;
                }
                console.log("files", files);
                const formData = new FormData();

                // Use the 'files' state directly instead of redefining it
                for (let i = 0; i < files.length; i++) {
                  formData.append("pdfFiles", files[i]);
                }

                const res = await addDocumentToAppointment({
                  id: props.params.id,
                  data: formData,
                });

                console.log("res", res);

                if (res.data) {
                  Swal.fire({
                    title: "Document added successfully!",
                    text: "New documents added!",
                    icon: "success",
                  });
                  setAddDocumentModalOpen(false);
                }
              }}
            >
              Submit
            </Button>

            <Button
              className="h-10 ml-2"
              type="text"
              onClick={handleAddDocumentModalCancel}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AppointmentDetails;
