import tipsImage from "../../src/utils/json/tips.json";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  useDeleteTipsMutation,
  useUpdateTipsMutation,
} from "../../redux/apiSlices/tips";

import Link from "next/link";
import Swal from "sweetalert2";
import { fetchPreview } from "../hook/fetchLink";

const TipsCard = ({ link, user = true }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true); // Start loading
    fetchPreview(link?.url)
      .then((data) => {
        setSelectedItem(data);
      })
      .finally(() => {
        setLoading(false); // Stop loading when data is fetched
      });

    form.setFieldValue("url", link?.url);
  }, [form, link]);

  const [updateTips] = useUpdateTipsMutation();
  const [deleteTips] = useDeleteTipsMutation();

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
        deleteTips(id).then((res) => {
          if (res.data) {
            Swal.fire("Deleted!", "Tips deleted successfully!", "success");
          } else if (res.error) {
            Swal.fire("Error", res?.error?.data?.message, "error");
          }
        });
      }
    });
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdatedTips = (values) => {
    updateTips({ id: values._id, data: values }).then((res) => {
      if (res.data) {
        Swal.fire("Success", "Tips updated successfully!", "success");
        setIsModalOpen(false);
      } else if (res.error) {
        Swal.fire("Error", res?.error?.data?.message, "error");
      }
    });
  };

  console.log(selectedItem?.ogImage);
  console.log(
    "tips image",
    tipsImage[Math.floor(Math.random() * 10)].image_url
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" /> {/* Ant Design loading spinner */}
        </div>
      ) : (
        <Link href={link?.url}>
          {selectedItem?.twitterImage?.length > 0 ? (
            <img
              src={
                selectedItem.twitterImage[0].url ||
                // selectedItem.ogImage[0].url ||
                tipsImage[Math.floor(Math.random() * 10)].image_url
              }
              alt={selectedItem?.title || "Preview Image"}
              width={500}
              height={300}
              className="w-full h-40 object-cover"
            />
          ) : (
            <img
              src={
                // link?.url ||
                tipsImage[Math.floor(Math.random() * 10)].image_url
              }
              alt="No preview available"
              width={500}
              height={300}
              className="w-full h-40 object-cover"
            />
          )}
        </Link>
      )}
      <Link href={link?.url}>
        <div className="p-4">
          <h2 className="text-md font-medium text-gray-800 mb-1">
            {selectedItem?.ogTitle || "No title available"}
          </h2>
          <p className="text-sm text-gray-500">
            {(selectedItem?.ogUrl?.slice(0, 35) || "") + "..."}
          </p>
        </div>
      </Link>

      {!user && (
        <div className="absolute top-2 right-2 flex space-x-2">
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
      )}

      <Modal
        title="Create New Tip"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdatedTips}>
          <Form.Item name="_id" style={{ display: "none" }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL Link"
            rules={[{ required: true, message: "Please enter the link" }]}
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

export default TipsCard;
