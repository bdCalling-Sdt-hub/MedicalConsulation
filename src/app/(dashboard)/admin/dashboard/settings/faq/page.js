"use client";

import { Button, Form, Input } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useAddFaqsMutation,
  useDeleteFaqsMutation,
  useGetFaqsQuery,
  useUpdateFaqsMutation,
} from "../../../../../../../redux/apiSlices/faqsSlices";

import { EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const SettingsFaq = () => {
  // State to manage the content and label of each panel

  // State to manage which panel is being edited (for both label and content)
  const [addNew, setNewOne] = useState(null);
  const [createNewFaq] = useAddFaqsMutation();
  const { data: faqs } = useGetFaqsQuery();

  console.log(faqs);

  const [form] = Form.useForm();

  const handleCreateService = async (values) => {
    console.log(values);
    const res = await createNewFaq(values);
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "Faqs new added successfully!",
        icon: "success",
      });
      setNewOne(false);
      form.resetFields(); // Reset form fields after submission
    }
  };

  // Save the edited label and content

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold py-3">FAQs</h1>
        <Button
          icon={<Plus />}
          onClick={() => setNewOne(true)}
          type="secondary"
        >
          Add New
        </Button>
      </div>

      {addNew && (
        <div className="mt-3 mb-6">
          <Form
            form={form}
            className="flex1 w-full "
            onFinish={handleCreateService}
            layout="vertical"
          >
            <Form.Item
              name="question"
              label="Question"
              className="w-full"
              rules={[{ required: true, message: "Please enter the question" }]}
            >
              <Input className="h-12 flex-1" placeholder="Enter question" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[{ required: true, message: "Please enter the answer" }]}
            >
              <Input.TextArea
                className="h-16 flex-1"
                placeholder="Enter answer"
              />
            </Form.Item>
            <div className="flex gap-4">
              <Button
                onClick={() => setNewOne(false)}
                type="secondary"
                className="bg-white border border-primary6 text-primary6"
              >
                Cancel
              </Button>
              <Button htmlType="submit" type="primary" className="bg-primary6">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}

      {faqs?.data?.map((faq) => (
        <FaqsComponent key={faq?._id} faq={faq} />
      ))}
    </div>
  );
};

export default SettingsFaq;

const FaqsComponent = ({ faq }) => {
  const [form] = Form.useForm();

  const [updatedFaq] = useUpdateFaqsMutation();
  const [deletedFaq] = useDeleteFaqsMutation();
  const [edit, setEdit] = useState(false);

  const handleUpdatedService = async (values) => {
    console.log(values);
    values.faqId = faq?._id;
    const res = await updatedFaq(values);
    if (res.data) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      setEdit(false);
      form.resetFields(); // Reset form fields after submission
    }
  };

  const handleDeleteService = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deletedFaq(faq?._id);
        if (res.data) {
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });
        }
      }
    });
  };

  useEffect(() => {
    form.setFieldsValue(faq);
  }, [edit, faq, form]);

  return (
    <div className=" border border-bg-primary1 bg-primary2 rounded-lg p-3 mb-3 flex justify-between items-start">
      {edit ? (
        <>
          <Form
            form={form}
            className="flex1 w-full"
            onFinish={handleUpdatedService}
            layout="vertical"
          >
            <Form.Item
              name="question"
              label="Question"
              className="w-full"
              rules={[{ required: true, message: "Please enter the question" }]}
            >
              <Input className="h-12 flex-1" placeholder="Enter question" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[{ required: true, message: "Please enter the answer" }]}
            >
              <Input.TextArea
                className="h-12 flex-1"
                placeholder="Enter answer"
              />
            </Form.Item>
            <Button icon={<EditOutlined />} htmlType="submit" type="secondary">
              Updated
            </Button>
            <Button
              danger
              icon={<EditOutlined />}
              onClick={() => setEdit(false)}
              type="secondary"
            >
              Cancel
            </Button>
          </Form>
        </>
      ) : (
        <>
          <div className="flex-1">
            <p className=" text-lg flex gap-3 items-center">
              <span className="text-gray-500 text-sm font-medium">Q:</span>
              <span className=" text-lg">{faq?.question}</span>
            </p>
            <p className="text-gray-500 text-base flex gap-3 items-center">
              <span className="text-gray-500 text-sm">A:</span>
              <span className=" text-md"> {faq?.answer}</span>
            </p>
          </div>
          <div>
            <Button
              icon={<EditOutlined />}
              type="secondary"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Edit
            </Button>
            <Button
              icon={<Trash2 />}
              type="primary"
              danger
              onClick={() => {
                handleDeleteService();
              }}
            >
              Deleted
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
