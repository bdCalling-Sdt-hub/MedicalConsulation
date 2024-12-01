"use client";
import tipsImage from "../../../../../../src/utils/json/tips.json";
import { Button, Form, Input, Modal, Spin } from "antd";
import {
  useAddTipsMutation,
  useGetAllTipsQuery,
} from "../../../../../../redux/apiSlices/tips";

import { useState } from "react";
import Swal from "sweetalert2";
import TipsCard from "../../../../../components/TipsCard";
import { fetchPreview } from "../../../../../hook/fetchLink";

function AddTips() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [link, setLink] = useState("");
  // State for modal visibility
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
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
          setSelectedItem(null);
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

  const handlePreview = (url) => {
    setLoading(true);
    fetchPreview(url)
      .then((data) => {
        setSelectedItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log("tips", tipsImage[0].image_url);
  console.log("tips", tipsImage);

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
            <Input
              allowClear
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter the link of tips blog or website, video"
            />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              className="bg-primary6 text-white"
              type="text"
              htmlType="submit"
            >
              Add Tips
            </Button>
            <Button
              className="bg-primary6 text-white"
              onClick={() => handlePreview(link)}
              type="text"
            >
              Preview
            </Button>
          </div>
        </Form>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" /> {/* Ant Design loading spinner */}
          </div>
        ) : (
          <>
            {selectedItem && (
              <div className="flex justify-center items-center pb-5">
                <div className="">
                  <h1 className="text-black text-[20px] font-merri font-normal ">
                    Preview
                  </h1>
                  <div className=" shadow-md py-4">
                    <div className="w-full ">
                      {selectedItem?.twitterImage?.length > 0 ? (
                        selectedItem.twitterImage
                          ?.slice(0, 1)
                          .map((image, index) => {
                            return (
                              <img
                                key={image?.url}
                                src={
                                  image?.url ||
                                  tipsImage[Math.floor(Math.random() * 10)]
                                    .image_url
                                }
                                alt={selectedItem?.title || "Preview Image"}
                                width={500}
                                height={300}
                                className="w-full h-40 object-cover"
                              />
                            );
                          })
                      ) : (
                        <img
                          src={
                            link?.url ||
                            tipsImage[Math.floor(Math.random() * 10)].image_url
                          } // Fallback image
                          alt="No preview available"
                          width={500}
                          height={300}
                          className="w-full h-40 object-cover"
                        />
                      )}
                    </div>
                    <div href={link?.url}>
                      <div href={link?.url} className="p-4">
                        <h2 className="text-md font-medium text-gray-800 mb-1">
                          {selectedItem?.ogTitle || "No title available"}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {(selectedItem?.ogUrl?.slice(0, 35) &&
                            selectedItem?.ogUrl?.slice(0, 35) + "...") ||
                            "No URL available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Modal>

      <section className={`bg-primary3 py-6 px-10`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4 items-center">
            {tips?.data?.map((link, index) => (
              <TipsCard key={index} link={link} user={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AddTips;
