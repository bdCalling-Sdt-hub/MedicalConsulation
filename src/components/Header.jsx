"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox, Flex, Input, Modal } from "antd";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconColoredFb from "../../public/icons/IconColoredFb";
import IconColoredGoogle from "../../public/icons/IconColoredGoogle";
import IconColoredTwitter from "../../public/icons/IconColoredTwitter";
import bigLogo from "../../public/images/big-logo.png";
import logo from "../../public/images/logo.png";

function Header() {
  const currentLocationPath = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isForgetPassModalOpen, setIsForgetPassModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isCreateNewPassModalOpen, setIsCreateNewPassModalOpen] =
    useState(false);

  const navItems = [
    { name: "Home", path: "#home" },
    { name: "About Us", path: "#about" },
    { name: "Services", path: "#services" },
    { name: "FAQ", path: "#faq" },
    { name: "Testimonials", path: "#testimonials" },
    { name: "Tips", path: "#tips" },
  ];
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSignInCancel = () => {
    setIsSignInModalOpen(false);
  };

  const handleForgetPassCancel = () => {
    setIsForgetPassModalOpen(false);
  };

  const handleOtpModalCancel = () => {
    setIsOtpModalOpen(false);
  };

  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const sharedProps = {
    onChange,
  };

  const handleCreateNewPassModalCancel = () => {
    setIsCreateNewPassModalOpen(false);
  };

  const [activeHash, setActiveHash] = useState("");
  const [navbarFixed, setNavbarFixed] = useState(false);
  useEffect(() => {
    const handleHashChange = (e) => {
      setActiveHash(window.location.hash);
    };

    const navbarFixed = () => {
      if (window.scrollY > 0) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };
    window.addEventListener("scroll", navbarFixed);
    window.addEventListener("hashchange", handleHashChange);

    window.addEventListener("scroll", handleHashChange);
    return () => {
      window.removeEventListener("scroll", handleHashChange);
    };
  }, []);

  return (
    <>
      <section
        className={`${
          navbarFixed ? "blur-background" : "bg-primary6"
        } z-[9999] fixed w-full shadow-xl`}
      >
        <div className="container mx-auto py-4 flex flex-row justify-between items-center">
          <div>
            <Image src={logo} alt="logo" />
          </div>
          <div>
            <ul
              className={`flex flex-row items-center gap-8 text-sm font-merri font-regular text-offBlack`}
            >
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <li
                    className={`font-normal  ${
                      (activeHash || "#home") === `${item.path}`
                        ? "text-secondaryBlack"
                        : "text-offBlack"
                    }`}
                  >
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex flex-row items-center gap-4">
            <button
              className={`text-secondaryBlack font-merri text-sm py-2 px-6 rounded-sm font-normal`}
              onClick={(e) => {
                setIsSignInModalOpen(true);
                e.preventDefault();
              }}
            >
              Sign In
            </button>
            <button
              className={`text-white bg-black font-merri text-sm py-2 px-6 rounded-sm font-normal`}
              onClick={(e) => {
                setIsModalOpen(true);
                e.preventDefault();
              }}
            >
              Register
            </button>
          </div>
        </div>
      </section>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        width={"70%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image src={bigLogo} alt="logo" />
          <h1
            className={`text-secondaryblack text-4xl font-bold font-merri mt-8`}
          >
            Get an Online Dr. Consultant Today!
          </h1>
          <h1
            className={`text-secondaryblack text-[20px] font-normal font-merri mt-8`}
          >
            Register with your Information or with Social Media
          </h1>

          <div className="grid grid-cols-9 w-full mt-8">
            <div className="col-span-4">
              {/* fb */}
              <div className="flex flex-row justify-center  py-2 items-center gap-2 bg-[#1877F2] border border-[#1877F2]">
                <IconColoredFb />{" "}
                <span className={`text-base font-merri font-normal text-white`}>
                  Continue with Facebook
                </span>
              </div>
              <div className="flex flex-row justify-center  py-2 items-center gap-2 bg-transparent border border-neutral5 my-4">
                <IconColoredGoogle />
                <span
                  className={`text-base font-merri font-normal text-secondaryBlack`}
                >
                  Continue with Google
                </span>
              </div>
              <div className="flex flex-row justify-center  py-2 items-center gap-2 bg-black border border-black">
                <IconColoredTwitter />{" "}
                <span className={`text-base font-merri font-normal text-white`}>
                  Continue with X
                </span>
              </div>
            </div>
            <div className="col-span-1">
              <div class="flex flex-col items-center justify-center h-full">
                <div class="border-l border-offBorder h-[46%]"></div>
                <span class="text-offBlack text-base font-merri font-normal my-2">
                  or
                </span>
                <div class="border-l border-offBorder h-[46%]"></div>
              </div>
            </div>
            <div className="col-span-4">
              <form action="" className={``}>
                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    Name
                  </p>
                  <Input
                    className={`py-2 focus:outline-none`}
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    Email
                  </p>
                  <Input
                    className={`py-2 focus:outline-none`}
                    type="email"
                    placeholder="Enter your e-mail"
                  />
                </div>

                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    Password
                  </p>
                  <Input.Password
                    className={`py-2`}
                    placeholder="Create your password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
                <Checkbox checked={true} className={`mt-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    Remember me
                  </p>
                </Checkbox>
                <div>
                  <button
                    className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(false);
                    }}
                  >
                    Register
                  </button>
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
                      setIsModalOpen(false);
                      setIsSignInModalOpen(true);
                    }}
                  >
                    Sign In
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={isSignInModalOpen}
        onCancel={handleSignInCancel}
        footer={null}
        maskClosable={false}
        width={"50%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image src={bigLogo} alt="logo" />
          <h1
            className={`text-secondaryblack text-4xl font-bold font-merri mt-8`}
          >
            Welcome back!
          </h1>
          <h1
            className={`text-secondaryblack text-[20px] font-normal font-merri mt-8`}
          >
            Sign In with the data that used while registration
          </h1>

          <div className=" w-full mt-8">
            <div>
              <form action="" className={``}>
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
                  />
                </div>

                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    Password
                  </p>
                  <Input.Password
                    className={`py-2`}
                    placeholder="Create your password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
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
                <div>
                  <button
                    className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignInModalOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                </div>
                <p
                  className={`text-offBlack text-sm font-normall font-merri text-center mt-4`}
                >
                  Not Registered yet?{" "}
                  <span
                    className={`text-primary7 cursor-pointer `}
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsSignInModalOpen(false);
                    }}
                  >
                    Register
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={isForgetPassModalOpen}
        onCancel={handleForgetPassCancel}
        footer={null}
        maskClosable={false}
        width={"50%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image src={bigLogo} alt="logo" />

          <div className=" w-full mt-8">
            <h1
              className={`text-secondaryblack text-[20px] font-normal font-merri`}
            >
              Forgot Password?
            </h1>
            <h3
              className={`text-secondaryblack text-base font-normal font-merri`}
            >
              We’ll send a 6 digit verification code to{" "}
              <span className={`text-primary6`}>immi....@gmail.com</span>
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
                  />
                </div>
                <div>
                  <button
                    className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
                    onClick={(e) => {
                      setIsForgetPassModalOpen(false);
                      e.preventDefault();
                      setIsOtpModalOpen(true);
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

      {/* otp modal */}
      <Modal
        open={isOtpModalOpen}
        onCancel={handleOtpModalCancel}
        footer={null}
        maskClosable={false}
        width={"50%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image src={bigLogo} alt="logo" />

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
              <span className={`text-primary6`}>immi....@gmail.com</span>
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
                <div>
                  <button
                    className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
                    onClick={(e) => {
                      setIsOtpModalOpen(false);
                      setIsCreateNewPassModalOpen(true);
                      e.preventDefault();
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

      {/* Ceate New Password modal */}
      <Modal
        open={isCreateNewPassModalOpen}
        onCancel={handleCreateNewPassModalCancel}
        footer={null}
        maskClosable={false}
        width={"50%"}
        closeIcon={<span style={{ color: "red", fontSize: "24px" }}>×</span>}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Image src={bigLogo} alt="logo" />
          <h1
            className={`text-[20px] font-normal font-merri text-secondaryBlack`}
          >
            Create New Password to Recover your Account
          </h1>

          <div className=" w-full mt-8">
            <div>
              <form action="" className={`mt-6`}>
                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    New Password
                  </p>
                  <Input.Password
                    className={`py-2`}
                    placeholder="Create your password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
                <div className={`mb-4`}>
                  <p
                    className={`text-sm text-secondaryBlack font-merri font-normal`}
                  >
                    Confirm Password
                  </p>
                  <Input.Password
                    className={`py-2`}
                    placeholder="Create your password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
                <div>
                  <button
                    className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
                    onClick={(e) => {
                      setIsCreateNewPassModalOpen(false);
                      e.preventDefault();
                    }}
                  >
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Header;
