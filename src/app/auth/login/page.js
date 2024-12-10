"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal } from "antd";
import {
  useForgotPasswordMutation,
  useLoginDoctorMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} from "../../../../redux/apiSlices/authSlice";

import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setUser } from "../../../../redux/apiSlices/userSlices";

const Login = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");

  const [forgetPass] = useForgotPasswordMutation({});
  const [resetPass] = useResetPasswordMutation({});
  const [verifyEmail] = useVerifyEmailMutation({});

  const [loginPatient] = useLoginMutation({});
  const [loginDoctor] = useLoginDoctorMutation({});
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isForgetPassModalOpen, setIsForgetPassModalOpen] = useState(false);
  const [isDoctorRegistered, setIsDoctorRegistered] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isTwoFAModalOpen, setIsTwoFAModalOpen] = useState(false);
  // const [handleIsTwoFAModalCancel, setHandleIsTwoFAModalCancel] =
  //   useState(false);
  const [isCreateNewPassModalOpen, setIsCreateNewPassModalOpen] =
    useState(false);
  const [userData, setUserData] = useState({});

  const handleForgetPassCancel = () => {
    setIsForgetPassModalOpen(false);
  };

  const handleOtpModalCancel = () => {
    setIsOtpModalOpen(false);
  };

  const handleTwoFAModalCancel = () => {
    setIsTwoFAModalOpen(false);
  };

  const onChange = (text) => {
    console.log("onChange:", text);
    console.log("userData", userData.email);
    verifyEmail({
      email: Email,
      emailVerifyCode: text,
    }).then((res) => {
      console.log(res);
      console.log("userData", userData);

      if (res?.data) {
        if (userData) {
          Swal.fire("Success", res.data?.message, "success");
          if (userData.role === "patient") {
            route.push("/");
          } else if (userData.role === "doctor") {
            route.push("/doctor/dashboard");
          } else if (userData.role === "admin") {
            route.push("/admin/dashboard");
          }
        } else {
          setIsCreateNewPassModalOpen(true);
        }
      } else if (res?.error) {
        Swal.fire("Error", res.error?.data?.message, "error");
      }
    });
  };

  const onChangeTwoFA = (text) => {
    console.log("onChangeTwoFA:", text);
    console.log("userProfile onChangeTwoFA", userProfile);
    verifyEmail({
      email: Email,
      emailVerifyCode: text,
    }).then((res) => {
      console.log(res);

      if (res?.data) {
        // if (userData.data?.data?.user?.role === "patient") {
        //   route.push("/");
        // } else if (userData.data?.data?.user?.role === "doctor") {
        //   route.push("/doctor/dashboard");
        // } else if (userData.data?.data?.user?.role === "admin") {
        //   route.push("/admin/dashboard");
        // }
        console.log("userData onChangeTwoFA", userData);
      } else if (res?.error) {
        Swal.fire("Error", res.error?.data?.message, "error");
      }
    });
  };
  const sharedProps = {
    onChange,
  };

  // const sharedPropsTwoFA = {
  //   onChangeTwoFA,
  // };

  const handleCreateNewPassModalCancel = () => {
    setIsCreateNewPassModalOpen(false);
  };

  const onFinishLogin = async (values) => {
    console.log(values);
    // if (isDoctorRegistered) {
    //   const res = await loginDoctor(values);
    //   console.log(res);
    //   if (res?.data) {
    //     Swal.fire("Success", res.data?.message, "success");
    //     // Set the token in a cookie
    //     // console.log(res.data?.data?.token);
    //     Cookies.set("token", res.data?.data?.token, {
    //       expires: 1,
    //       path: "/",
    //     }); // Expires in 1 day
    //     Cookies.set("userRole", res.data?.data?.user?.role, {
    //       expires: 1,
    //       path: "/",
    //     }); // Optional: Set user role
    //     dispatch(setUser(res.data?.data?.user));
    //     Swal.fire("Success", res.data?.message, "success");

    //     route.push("/");
    //   }
    //   if (res.error) {
    //     Swal.fire("Error", res.error?.data?.message, "error");
    //   }
    // }
    // if (!isDoctorRegistered) {

    const res = await loginPatient(values);
    console.log(res);
    if (res.error) {
      Swal.fire("Error", res.error?.error, "error");
    }
    if (res?.data) {
      // Set the token in a cookie
      // console.log(res.data?.data?.token);
      Cookies.set("token", res.data?.data?.token, {
        expires: 1,
        path: "/",
      }); // Expires in 1 day
      Cookies.set("userRole", res.data?.data?.user?.role, {
        expires: 1,
        path: "/",
      }); // Optional: Set user role
      dispatch(setUser(res.data?.data?.user));
      // Swal.fire("Success", res.data?.message, "success");
      // if (res.data?.data?.user?.role === "patient") {
      //   route.push("/");
      // } else if (res.data?.data?.user?.role === "doctor") {
      //   route.push("/doctor/dashboard");
      // } else if (res.data?.data?.user?.role === "admin") {
      //   route.push("/admin/dashboard");
      // }
      handleSendOTPTwoFA(res);
      console.log("user data", res.data?.data?.user);
      setUserData(res.data?.data?.user);
      console.log("user data", userData);
    }
    if (res.error) {
      Swal.fire("Error", res.error?.data?.message, "error");
    }
    // }
    // console.log("Success:", values);
  };
  const onFinishFailedLogin = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSendTOtp = () => {
    forgetPass(Email).then((res) => {
      console.log("handleSendTOtp", res);
      if (res?.data) {
        setIsForgetPassModalOpen(false);
        setIsOtpModalOpen(true);
        Swal.fire("Success", res.data?.message, "success");
      } else if (res?.error) {
        Swal.fire("Error", res.error?.data?.message, "error");
      }
    });
  };
  const userProfile = useSelector((state) => state.user?.user);
  const handleSendOTPTwoFA = (userData) => {
    // console.log("userProfile", userProfile);
    console.log("token", userData.data?.data?.token);
    console.log("role", userData.data?.data?.user?.role);
    console.log("message", userData.data?.message);
    forgetPass(Email).then((res) => {
      console.log("handleSendOTPTwoFA", res);
      if (res?.data) {
        // setIsForgetPassModalOpen(false);
        // setIsOtpModalOpen(true);
        setIsTwoFAModalOpen(true);
        Swal.fire("Success", res.data?.message, "success");
        // if (userData.data?.data?.user?.role === "patient") {
        //   route.push("/");
        // } else if (userData.data?.data?.user?.role === "doctor") {
        //   route.push("/doctor/dashboard");
        // } else if (userData.data?.data?.user?.role === "admin") {
        //   route.push("/admin/dashboard");
        // }
      } else if (res?.error) {
        Swal.fire("Error", res.error?.data?.message, "error");
      }
    });
  };

  const handleCreateNewPassword = (values) => {
    console.log(values);
    resetPass({
      email: Email,
      ...values,
    }).then((res) => {
      console.log(res);
      if (res?.data) {
        setIsOtpModalOpen(false);
        setIsCreateNewPassModalOpen(false);
        setIsSignInModalOpen(true);
        Swal.fire("Success", res.data?.message, "success");
      } else if (res?.error) {
        Swal.fire("Error", res.error?.data?.message, "error");
      }
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary1">
      <div className="flex flex-col items-center justify-center p-10 w-1/3 bg-white rounded shadow-lg">
        <Image src={require("../../../../public/images/logo.png")} alt="logo" />
        <h1
          className={`text-secondaryblack text-4xl font-bold font-merri mt-8`}
        >
          Welcome back!
        </h1>

        {/* <div className="gap-1 bg-[#e3e3e3] flex flex-row items-center mt-6">
          <button
            className={`${
              !isDoctorRegistered ? "bg-primary6 text-white" : ""
            } px-4 py-2 rounded text-neutral10 text-sm font-merri font-normal`}
            onClick={() => setIsDoctorRegistered(false)}
          >
            I{"'"}m a Patient
          </button>
          <button
            className={`${
              isDoctorRegistered ? "bg-primary6 text-white" : ""
            } px-4 py-2 rounded text-neutral10 text-sm font-merri font-normal`}
            onClick={() => setIsDoctorRegistered(true)}
          >
            I{"'"}m a Doctor
          </button>
        </div> */}
        <div className=" w-full mt-8">
          <div>
            <Form
              name="basic"
              className={``}
              initialValues={{ remember: true }}
              onFinish={onFinishLogin}
              onFinishFailed={onFinishFailedLogin}
              layout="vertical"
            >
              <div className={`mb-4`}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    className={`py-2 focus:outline-none`}
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>

              <div className={`mb-4`}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    className={`py-2 focus:outline-none`}
                    placeholder="**********"
                  />
                </Form.Item>
              </div>

              <div>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    className={`bg-primary6 w-full h-12 py-2 rounded text-white text-base font-merri font-normal mt-4`}
                    onClick={(e) => {
                      // setIsModalOpen(false);
                      // e.preventDefault();
                      // handleSendTOtp();
                    }}
                  >
                    Login
                  </Button>
                </Form.Item>
              </div>
              <div className="flex flex-row justify-end">
                <p
                  className={`text-sm text-secondaryBlack font-merri font-normal underline cursor-pointer`}
                  onClick={() => {
                    setIsForgetPassModalOpen(true);
                    setIsSignInModalOpen(false);
                  }}
                >
                  Forgot Password?
                </p>
              </div>
              <p
                className={`text-offBlack text-sm font-normall font-merri text-center mt-4`}
              >
                have an account?{" "}
                <span
                  className={`text-primary7 cursor-pointer`}
                  onClick={() => {
                    route?.push("/auth/register");
                  }}
                >
                  Sign up
                </span>
              </p>
            </Form>
          </div>
        </div>
      </div>

      {/* =========================forget modal =================== */}
      <Modal
        open={isForgetPassModalOpen}
        onCancel={handleForgetPassCancel}
        footer={null}
        maskClosable={false}
        centered
        width={"40%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image
            src={require("../../../../public/images/logo.png")}
            alt="logo"
          />

          <div className=" w-full mt-8">
            <h1
              className={`text-secondaryblack text-[20px] font-normal font-merri`}
            >
              Forgot Password?
            </h1>
            <h3
              className={`text-secondaryblack text-base font-normal font-merri`}
            >
              We’ll send a 6 digit code you email for verification{" "}
              {/* <span className={`text-primary6`}>immi....@gmail.com</span> */}
            </h3>
            <div>
              <form action="" className={`mt-6`}>
                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    Email
                  </p>
                  <Input
                    className={`py-2`}
                    type="email"
                    placeholder="Enter your e-mail"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <button
                    className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSendTOtp();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      {/*======================== otp modal ===================*/}
      <Modal
        open={isOtpModalOpen}
        onCancel={handleOtpModalCancel}
        footer={null}
        maskClosable={false}
        centered
        width={"40%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image
            src={require("../../../../public/images/logo.png")}
            alt="logo"
          />

          <div className=" w-full mt-8">
            <h1
              className={`text-secondaryblack text-[20px] font-normal font-merri`}
            >
              OTP Verification
            </h1>
            <h3
              className={`text-secondaryblack text-base font-normal font-merri`}
            >
              We’ve sent a 6 digit verification code to{" "}
              <span className={`text-primary6`}>{Email}</span>
            </h3>
            <div>
              <form action="" className={`mt-6`}>
                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    OTP
                  </p>
                  <Flex gap="middle" align="flex-center" vertical>
                    <Input.OTP
                      formatter={(str) => str.toUpperCase()}
                      {...sharedProps}
                    />
                  </Flex>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/*======================== 2FA MODAL ===================*/}
      <Modal
        open={isTwoFAModalOpen}
        onCancel={handleTwoFAModalCancel}
        footer={null}
        maskClosable={false}
        centered
        width={"40%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image
            src={require("../../../../public/images/logo.png")}
            alt="logo"
          />

          <div className=" w-full mt-8">
            <h1
              className={`text-secondaryblack text-[20px] font-normal font-merri`}
            >
              OTP Verification fot two factor authentication
            </h1>
            <h3
              className={`text-secondaryblack text-base font-normal font-merri`}
            >
              We’ve sent a 6 digit verification code to{" "}
              <span className={`text-primary6`}>{Email}</span>
            </h3>
            <div>
              <form action="" className={`mt-6`}>
                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    OTP
                  </p>
                  <Flex gap="middle" align="flex-center" vertical>
                    <Input.OTP
                      formatter={(str) => str.toUpperCase()}
                      // {...sharedPropsTwoFA}
                      {...sharedProps}
                    />
                  </Flex>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      {/* Ceate New Password modal */}
      <Modal
        open={isCreateNewPassModalOpen}
        onCancel={handleCreateNewPassModalCancel}
        footer={null}
        maskClosable={false}
        width={"40%"}
        centered
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image
            src={require("../../../../public/images/logo.png")}
            alt="logo"
          />
          <h1
            className={`text-[20px] font-normal font-merri text-secondaryBlack`}
          >
            Create New Password to Recover your Account
          </h1>

          <div className=" w-full mt-8">
            <div>
              <Form
                onFinish={handleCreateNewPassword}
                action=""
                className={`mt-6`}
              >
                <div className={`mb-4`}>
                  <Form.Item
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className={`py-2`}
                      placeholder="Create your password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>
                <div className={`mb-4`}>
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className={`py-2`}
                      placeholder="Confirm your password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Button
                    htmlType="submit"
                    className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
                  >
                    Done
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
