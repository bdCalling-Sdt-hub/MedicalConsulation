"use client";

import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  useAddTipsMutation,
  useDeleteTipsMutation,
  useGetAllTipsQuery,
  useUpdateTipsMutation,
} from "../../../../../../redux/apiSlices/tips";

import Swal from "sweetalert2";
import metadata from "url-metadata"; // Import url-metadata package

function AddTips() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Ant Design form instance

  const { data: tips } = useGetAllTipsQuery({});
  const [addTips] = useAddTipsMutation();

  // Function to open modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset form fields when modal closes
  };

  // Function to handle form submission
  const handleAddNewTips = (values) => {
    console.log("Service created:", values);

    addTips(values)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            title: "Good job!",
            text: "Tips added successfully!",
            icon: "success",
          });
          setIsModalOpen(false);
          form.resetFields(); // Reset form fields after submission
        }
        if (res.error) {
          console.log(res.error);
          Swal.fire({
            title: "Error",
            text: res?.error?.data?.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="p-4">
          <span className="text-xl font-bold">Health Tips</span>
        </h1>
        <div>
          <Button
            type="text"
            className="bg-primary6 text-white"
            onClick={showModal}
          >
            Add Tips
          </Button>
        </div>
      </div>

      <Modal
        title="Create New Tip"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddNewTips}>
          <Form.Item
            name="url"
            label="URL Link"
            rules={[{ required: true, message: "Please enter the link " }]}
          >
            <Input placeholder="Enter the link of tips blog or website, video" />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add Tips
            </Button>
          </div>
        </Form>
      </Modal>

      <section className={`bg-primary3 py-6 px-10`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4 items-center">
            {tips?.data?.map((link, index) => (
              <LinkViewComponent key={index} link={link} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AddTips;

const LinkViewComponent = ({ link }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to fetch metadata
  const fetchMetaData = async (url) => {
    try {
      console.log("Fetching metadata for:", url);
      const data = await metadata(url);
      setSelectedItem(data); // Update state with fetched metadata
      console.log("Fetched metadata:", data);
    } catch (error) {
      console.error("Error fetching metadata for URL:", url);
      console.error("Error message:", error.message); // Log the error message
      if (error.message === "Failed to fetch") {
        console.error(
          "Network error: Unable to fetch the metadata. Please check the URL and your network connection."
        );
      } else {
        console.error("Error fetching metadata:", error);
      }
    }
  };

  useEffect(() => {
    const testUrl = "https://www.wikipedia.org"; // Replace with a known URL
    fetchMetaData(testUrl); // Fetch metadata for the test URL
    form.setFieldsValue(link);
  }, []);

  // Optional: If you want to fetch metadata for the provided link.url
  useEffect(() => {
    if (link?.url) {
      fetchMetaData(link?.url); // Fetch metadata for the provided link
    }
  }, [link?.url]);

  const [updateTips] = useUpdateTipsMutation();
  const [deletedTips] = useDeleteTipsMutation();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletedTips(id)
          .then((res) => {
            console.log(res);
            if (res.data) {
              Swal.fire({
                title: "Good job!",
                text: "Tips deleted successfully!",
                icon: "success",
              });
            }
            if (res.error) {
              console.log(res.error);
              Swal.fire({
                title: "Error",
                text: res?.error?.data?.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Ant Design form instance

  // Function to open modal

  // Function to close modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Function to handle form submission
  const handleUpdatedTips = (values) => {
    // console.log("Service created:", values);

    updateTips({
      id: values?._id,
      data: values,
    })
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            title: "Good job!",
            text: "Tips Updated successfully!",
            icon: "success",
          });
          setIsModalOpen(false);
        }
        if (res.error) {
          console.log(res.error);
          Swal.fire({
            title: "Error",
            text: res?.error?.data?.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
      <img
        src={selectedItem?.image || "fallback-image-url"}
        alt={selectedItem?.title || "Preview Image"}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-md font-medium text-gray-800 mb-1">
          {selectedItem?.title || "No title available"}
        </h2>
        <p className="text-sm text-gray-500">
          {link?.url?.slice(0, 30) + "..."}
        </p>
      </div>

      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button
          onClick={handleUpdateClick}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(link?._id)}
          className="bg-red-100 hover:bg-red-200 text-red-600 text-xs px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>

      <Modal
        title="Create New Tip"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdatedTips}>
          <Form.Item name="_id">
            <Input style={{ display: "none" }} />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL Link"
            rules={[{ required: true, message: "Please enter the link " }]}
          >
            <Input placeholder="Enter the link of tips blog or website, video" />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add Tips
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
