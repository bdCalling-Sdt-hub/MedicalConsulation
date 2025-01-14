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
} from "antd";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  useAddNoteMutation,
  useEditNoteMutation,
} from "../../../../../../../redux/apiSlices/notesSlices";
import {
  useAddPrescriptionMutation,
  useEditPrescriptionMutation,
  useDownloadPrescriptionMutation,
} from "../../../../../../../redux/apiSlices/prescriptionSlices";
import { createRoot } from "react-dom/client"; // Import createRoot for React 18+
import { InfoCircleOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { imageUrl } from "../../../../../../../redux/api/baseApi";
import { useGetAppointmentByIdQuery } from "../../../../../../../redux/apiSlices/appointmentsSlices";
import { PDFRenderer } from "@react-pdf/renderer";
// Dynamic import for JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Title, Text } = Typography;

const AppointmentDetails = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [editNoteModalOpen, setEditNoteModalOpen] = useState(false);
  const [prescriptionModalOpen, setPrescriptionNoteModalOpen] = useState(false);
  const [editPrescriptionModalOpen, setEditPrescriptionModalOpen] =
    useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const route = useRouter();
  const [noteForm] = Form.useForm();
  const [prescriptionForm] = Form.useForm();
  const [selectNoteData, setSelectNoteData] = useState(null);
  const [selectPrescriptionData, setSelectPrescriptionData] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const componentRef = useRef();
  console.log("url", window.location.href);
  const url = new URL(window.location.href);
  const path = url.pathname;
  const slug = path.split("/").slice(3).join("/");
  console.log("slug", slug);
  console.log("path", path);
  console.log("type of path", typeof path);
  // Effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const generatePdf = async (item) => {
  //   try {
  //     const element = componentRef.current;

  //     console.log("element generatePdf", element);
  //     console.log("item generatePdf clicked", item.content);

  //     // if (!element) return;
  //     if (!item) return;

  //     const canvas = await html2canvas(item.content, { scale: 2 });
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const imgWidth = 190; // Width for the PDF
  //     const pageHeight = 297; // A4 Page height
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }
  //   } catch (error) {
  //     console.log("error generatePdf", error);
  //   }
  // };

  // const generatePdf = async (item) => {
  //   const element = componentRef.current;

  //   console.log("element generatePdf", element);
  //   console.log("item generatePdf clicked", item);
  //   console.log("item generatePdf clicked", item.content);

  //   // if (!element) return;
  //   if (!item) return;
  //   const doc = new jsPDF();
  //   console.log("doc", doc);

  //   doc.html(item.content, {
  //     callback: (doc) => {
  //       console.log("pdf generated");
  //       doc.save("download.pdf");
  //     },
  //     // margin: [10, 0, 0, 0], // Optional: set margins for the PDF
  //     // x: 10, // Optional: set the x position of the content
  //     // y: 10, // Optional: set the y position of the content
  //   });
  //   console.log("pdf", doc);
  // };
  // const generatePdf = async (item) => {
  //   if (!item || !item.content) {
  //     console.error("Invalid item or content");
  //     return;
  //   }

  //   console.log("item generatePdf clicked item.content", item.content);
  //   console.log("item generatePdf clicked item", item);

  //   const doc = new jsPDF("p", "mm", "a4"); // A4 size PDF in portrait mode

  //   doc.html(item.content, {
  //     callback: (doc) => {
  //       console.log("PDF generated successfully");
  //       doc.save("Prescription.pdf");
  //     },
  //     x: 10, // X position of content
  //     y: 10, // Y position of content
  //     html2canvas: {
  //       scale: 0.25, // Adjust this scale to fit the content
  //     },
  //     width: 190, // Width of the rendered content (adjust to fit within A4 width)
  //     windowWidth: 1200, // Window width used for rendering (set this based on your content's design)
  //   });

  //   console.log("PDF generation completed");
  // };

  const TestRef = useRef();
  const generatePdf = async (item) => {
    if (!item || !item.content) {
      console.error("Invalid item or content");
      return;
    }

    // Create a container to render the HTML content
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px"; // Hide it off-screen
    container.style.width = "794px"; // Set width for A4 size (in pixels at 96dpi)
    container.style.padding = "10px"; // Add padding for better visuals
    container.style.background = "white"; // Ensure a white background
    document.body.appendChild(container);

    // Render content into the container
    const root = createRoot(container);
    root.render(
      <div
        dangerouslySetInnerHTML={{ __html: item.content }}
        style={{ width: "100%" }}
      />
    );

    try {
      // Allow some time for content to render before capturing
      await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay

      // Capture the content using html2canvas
      const canvas = await html2canvas(container, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Handle cross-origin issues
        logging: true, // Debugging
      });

      // Generate the PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      console.log("Canvas captured:", imgData);

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      const imgX = (pdfWidth - scaledWidth) / 2; // Center horizontally
      const imgY = 10; // Add top margin

      pdf.addImage(imgData, "PNG", imgX, imgY, scaledWidth, scaledHeight);
      pdf.save("Prescription.pdf");

      downloadPrescription(item._id);
      console.log("PDF generated successfully", item);
      console.log("item id", item._id);
      console.log("download count", item.downloadCount);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Clean up the container
      root.unmount();
      document.body.removeChild(container);
    }
  };

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
    navigate.push("/patient/dashboard/consultant");
  };

  const [addNote] = useAddNoteMutation();
  const [editNote] = useEditNoteMutation();
  const [addPrescription] = useAddPrescriptionMutation();
  const [editPrescription] = useEditPrescriptionMutation();
  const [downloadPrescription] = useDownloadPrescriptionMutation();

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

  const handleEditNoteSubmit = async (values) => {
    console.log(values);
    const res = await editNote({
      ...values,
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
    const res = await editPrescription({
      ...values,
    });
    console.log(res);
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      setPrescriptionNoteModalOpen(false);
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

  const handleDocumentClick = () => {
    console.log("handleDocumentClick");
    route.push(`${path}/documents`);
  };

  return (
    <div ref={TestRef}>
      <div className="flex justify-between gap-3 items-center w-full">
        <div onClick={handleBack} className="flex cursor-pointer">
          <ChevronLeft />
          <h1>Back</h1>
        </div>
        <div>
          <Button onClick={() => handleDocumentClick()} type="default">
            Documents
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
                Appointments?.data?.doctor?.image
                  ? imageUrl + Appointments?.data?.doctor?.image
                  : require("../../../../../../../public/images/avatar.png")
              }
              className="w-24 h-24 rounded-full mx-auto"
              alt=""
            />
            <h1 className="text-xl font-bold py-2 text-gray-900">
              {Appointments?.data?.doctor?.name}
            </h1>

            <p>{Appointments?.data?.doctor?.email}</p>
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
                  {Appointments?.data?.doctor?.name}
                </p>
                <h1 className="mt-6">Phone Number</h1>
                <p className="mt-2 border-b border-gray-200 font-bold">
                  {Appointments?.data?.doctor?.phone}
                </p>
              </div>
              <div>
                <h1 className="mt-6">Email</h1>
                <p className="mt-2 border-b border-gray-200 font-bold">
                  {Appointments?.data?.doctor?.email}
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
                    {/* <Button
                      type="text"
                      icon={<EditOutlined />}
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        color: "#1890ff",
                      }}
                      onClick={() => editNoteModalClicked(note)} // Replace with actual edit handler
                    /> */}
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
                <div key={index}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item?.content,
                    }}
                    className="pl-10 text-justify py-12"
                  ></div>
                  <div className="flex flex-col items-end py-2">
                    <Button
                      icon={<CloudDownloadOutlined />}
                      type="text"
                      size="small"
                      className="h-10 bg-primary6 text-white"
                      onClick={() => generatePdf(item)}
                      disabled={item?.downloadCount}
                    >
                      Download Prescription
                    </Button>
                  </div>

                  {/* <Space
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
                      ref={componentRef}
                    > */}
                  {/* Edit button in top-right corner */}
                  {/* <Button
                      type="text"
                      icon={<EditOutlined />}
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        color: "#1890ff",
                      }}
                      onClick={() => prescriptionModalClicked(item)} // Replace with actual edit handler
                    /> */}
                  {/* <Title
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
                      <div className="flex flex-col items-end py-2">
                        <Button
                          icon={<CloudDownloadOutlined />}
                          type="text"
                          size="small"
                          className="h-10 bg-primary6 text-white"
                          onClick={() => generatePdf(item)}
                        >
                          Download Prescription
                        </Button>
                      </div>
                    </Card>
                  </Space> */}
                </div>
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
