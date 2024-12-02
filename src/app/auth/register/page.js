"use client";

import { Button, Checkbox, Form, Input } from "antd";
import {
  useSignUpDoctorMutation,
  useSignUpPatientMutation,
} from "../../../../redux/apiSlices/authSlice";

import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/apiSlices/userSlices";
import Swal from "sweetalert2";

const Login = () => {
  const route = useRouter();
  const dispatch = useDispatch();

  const [singUpDoctor] = useSignUpDoctorMutation({});
  const [signUpPatient] = useSignUpPatientMutation({});

  const [isDoctorRegistered, setIsDoctorRegistered] = useState(false);

  const onFinishSignUp = async (values) => {
    if (isDoctorRegistered) {
      const res = await singUpDoctor({ ...values });
      console.log(res);
      if (res?.data) {
        Swal.fire("Success", res.data?.message, "success");

        // Set the token in a cookie
        // console.log(res.data?.data?.token);
        Cookies.set("token", res.data?.data?.token, {
          expires: 1,
          path: "/",
        }); // Expires in 1 day
        Cookies.set("userRole", res.data?.data?.newUser?.role, {
          expires: 1,
          path: "/",
        }); // Optional: Set user role
        dispatch(setUser(res.data?.data?.user));
        route.push("/");
      }
      if (res.error) {
        Swal.fire("Already Applied", res.error?.data?.message, "error");
      }
    } else {
      const res = await signUpPatient({ ...values });
      console.log(res);
      if (res?.data) {
        route.push("/");

        // Set the token in a cookie
        // console.log(res.data?.data?.token);
        Cookies.set("token", res.data?.data?.token, {
          expires: 1,
          path: "/",
        }); // Expires in 1 day
        Cookies.set("userRole", res.data?.data?.newUser?.role, {
          expires: 1,
          path: "/",
        }); // Optional: Set user role
        dispatch(setUser(res.data?.data?.newUser));
        Swal.fire("Success", res.data?.message, "success");
      }
      if (res.error) {
        Swal.fire("Error", res.error?.data?.message, "error");
      }
    }
    // console.log("Success:", values);
  };
  const onFinishFailedSignUp = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // toast.error("🦄 Wow so easy!", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary1">
      <div className="flex flex-col items-center justify-center p-10 w-1/2 bg-white rounded shadow-lg">
        <Image src={require("../../../../public/images/logo.png")} alt="logo" />
        <h1
          className={`text-secondaryblack text-4xl font-bold font-merri mt-8`}
        >
          {isDoctorRegistered
            ? "Join Our Network of Professionals"
            : "Get an Online Dr. Consultant Today!"}
        </h1>

        <div className="gap-1 bg-[#e3e3e3] flex flex-row items-center mt-6">
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
        </div>
        <h1
          className={`text-secondaryblack text-[20px] font-normal font-merri mt-8`}
        >
          Register with your Information or with Social Media
        </h1>

        <div className=" w-full mt-8">
          <div className="">
            <Form
              name="basic"
              className={``}
              initialValues={{ remember: true }}
              onFinish={onFinishSignUp}
              onFinishFailed={onFinishFailedSignUp}
              layout="vertical"
            >
              <div className={`mb-4`}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input
                    className={`py-2 focus:outline-none`}
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              </div>

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
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <div>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    className={`bg-primary6 w-full h-12 py-2 rounded text-white text-base font-merri font-normal mt-4`}
                    onClick={(e) => {
                      // setIsModalOpen(false);
                    }}
                  >
                    Register
                  </Button>
                </Form.Item>
              </div>
              <p
                className={`text-secondaryBlack text-sm font-merri font-normal mt-4 text-center`}
              >
                By continuing you are agree with our Privacy Policy, Terms &
                Conditions
              </p>
              <p
                className={`text-offBlack text-sm font-normall font-merri text-center mt-4`}
              >
                Already Registered?{" "}
                <span
                  className={`text-primary7 cursor-pointer`}
                  onClick={() => {
                    route.push("/auth/login");
                  }}
                >
                  Sign In
                </span>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
