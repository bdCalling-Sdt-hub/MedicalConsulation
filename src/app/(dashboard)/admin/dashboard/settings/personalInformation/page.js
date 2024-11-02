"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Radio, Upload, message } from "antd";
import { useEffect, useState } from "react";
import {
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../../../../../../redux/apiSlices/authSlice";

import ImgCrop from "antd-img-crop";
import Swal from "sweetalert2";
import { imageUrl } from "../../../../../../../redux/api/baseApi";

const Settings_personalInformation = () => {
  const { data: userProfile } = useGetUserProfileQuery();
  const [updatedPass] = useChangePasswordMutation();
  const [form] = Form.useForm();
  // console.log(userProfile);

  const [image, setImage] = useState(null);
  const [value4, setValue4] = useState("info");
  const onChange4 = ({ target: { value } }) => {
    setValue4(value);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    if (value4 === "info") {
      handleUserUpdate(values);
    }
    if (value4 === "password") {
      handlePasswordUpdate(values);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const optionsWithDisabled = [
    {
      label: "Information Updated",
      value: "info",
    },
    {
      label: "Password Updated",
      value: "password",
    },
  ];

  const [fileList, setFileList] = useState([]); // State to hold the list of uploaded files

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update the state with the new file list
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/jpg",
    ]; // Allowed file types

    if (!allowedTypes.includes(file.type)) {
      message.error("You can only upload JPG/PNG/GIF files!");
      onError(new Error("Invalid file type"));
      return;
    }

    // Simulate a file upload
    try {
      const formData = new FormData();
      formData.append("file", file);
    } catch (error) {
      onError(error);
      message.error(`Upload failed: ${error.message}`);
    }
  };

  const beforeUpload = (file) => {
    const isValid = file.size / 1024 / 1024 < 2; // Limit to 2 MB
    if (!isValid) {
      message.error("File must be smaller than 2MB!");
    }
    return isValid;
  };

  const [userUpdate] = useUpdateUserProfileMutation();

  const handleUserUpdate = (values) => {
    console.log(values);
    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    fileList && formData.append("image", fileList[0]?.originFileObj);
    userUpdate(formData).then((res) => {
      console.log(res);
      if (res.data) {
        Swal.fire({
          title: "Good job!",
          text: "Your profile has been updated!",
          icon: "success",
        });
      }
    });
  };

  const handlePasswordUpdate = (values) => {
    console.log(values);
    updatedPass(values)
      .then((res) => {
        console.log(res);
        if (res.error) {
          Swal.fire({
            title: "Error!",
            text: res.error?.data?.message,
            icon: "error",
          });
        }
        if (res.data) {
          Swal.fire({
            title: "Good job!",
            text: "Your password has been updated!",
            icon: "success",
          });
          form.resetFields();
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error?.data?.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    if (value4 === "info") {
      form.setFieldsValue({
        name: userProfile?.data?.name,
        phone: userProfile?.data?.phone,
        image: imageUrl + userProfile?.data?.image,
      });
      console.log(userProfile?.data?.image);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: imageUrl + userProfile?.data?.image,
        },
      ]);
    }
    if (value4 === "password") {
      form.setFieldsValue({
        email: userProfile?.data?.email,
      });
    }
  }, [userProfile, value4, form]);

  return (
    <div className="border border-gray-200  rounded-2xl flex flex-col items-center">
      <div className="p-4">
        <Radio.Group
          options={optionsWithDisabled}
          onChange={onChange4}
          value={value4}
          optionType="button"
          buttonStyle="outline"
        />
      </div>
      {value4 === "info" ? (
        <>
          {/* user updated Form */}

          <Form
            name="basic"
            layout="vertical"
            style={{ width: "100%", maxWidth: "800px" }} // Ensures the form and its elements are centered
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="image"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0px 0px 0px",
              }}
            >
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  customRequest={customRequest}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="name" className="h-12" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input placeholder="Phone" type="number" className="h-12" />
            </Form.Item>

            <Form.Item>
              <Button
                type="text"
                className="w-full h-12 bg-primary6 text-white"
                htmlType="submit"
              >
                Updated
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          {/* password Form  updated*/}
          <Form
            name="basic"
            layout="vertical"
            form={form}
            style={{ width: "100%", maxWidth: "800px", marginTop: "50px" }} // Ensures the form and its elements are centered
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Email"
                className="h-12"
                disabled
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your old password!" },
              ]}
            >
              <Input.Password
                placeholder="Old Password"
                className="h-12"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password
                placeholder="New Password"
                className="h-12"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                className="h-12"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="text"
                className="w-full h-12 bg-primary6 text-white"
                htmlType="submit"
              >
                Updated
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default Settings_personalInformation;
