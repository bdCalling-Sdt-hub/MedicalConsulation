"use client";

import { Button, Form, Input, Modal } from "antd";

import { useState } from "react";

function CreteServices({ title, titleStyle, containerBg }) {
  const [selectedItem, setSelectedItem] = useState(null); // State to store only one selected item
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Ant Design form instance

  const services = [
    "10 Minutes Telephone Consultation",
    "15 Minutes Video Consultation",
    "20 Minutes Video Consultation",
    "Medication Reviews",
    "Peadiatric Reviews",
    "Geriatric Reviews",
    "20 point comprehensive medical assessment with detailed report",
  ];

  // Function to handle selecting an item
  const handleSelectItem = (item) => {
    setSelectedItem(item); // Set the clicked item as the selected item
  };

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
  const handleCreateService = (values) => {
    console.log("Service created:", values);
    setIsModalOpen(false);
    form.resetFields(); // Reset form fields after submission
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
            name="serviceName"
            label=" Name"
            rules={[
              { required: true, message: "Please enter the service name" },
            ]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>
          <Form.Item
            name="serviceName"
            label=" Type"
            rules={[
              { required: true, message: "Please enter the service name" },
            ]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>
          <Form.Item
            name="serviceName"
            label=" Division"
            rules={[
              { required: true, message: "Please enter the service name" },
            ]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>
          <Form.Item
            name="serviceName"
            label=" Doctor"
            rules={[
              { required: true, message: "Please enter the service name" },
            ]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>
          <Form.Item
            name="servicePrice"
            label="Service Price"
            rules={[
              { required: true, message: "Please enter the service price" },
            ]}
          >
            <Input placeholder="Enter service price" type="number" />
          </Form.Item>
          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Service Listing Section */}
      <section className={`${containerBg || "bg-primary3 rounded-md py-10"}`}>
        <div className="container mx-auto px-4">
          <h1
            className={`${
              titleStyle ||
              "text-primary10 text-[32px] leading-[22px] font-merri mb-6 font-bold"
            }`}
          >
            {title || "Services"}
          </h1>

          <div className="grid grid-cols-4 gap-4 items-center p-5">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleSelectItem(service)}
                className={`cursor-pointer p-4 rounded-md h-52 flex flex-col justify-between flex-1  
                ${
                  selectedItem === service
                    ? "bg-primary6 text-white"
                    : "bg-white border border-neutral4 text-black"
                }`} // Conditional styles for the selected item
              >
                <h1
                  className={`text-lg font-roboto ${
                    selectedItem === service ? "text-white" : "text-black"
                  }`} // Adjust text color based on selection
                >
                  {service}
                </h1>
                <p
                  className={`text-base font-roboto font-medium ${
                    selectedItem === service ? "text-white" : "text-black"
                  }`} // Adjust price text color based on selection
                >
                  $ 5.00
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default CreteServices;
