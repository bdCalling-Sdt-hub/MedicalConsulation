"use client";

import "../../dashboard.css";

import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import { Bell, LogOut, User, User2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaChartPie,
  FaLock,
  FaRegUserCircle,
  FaUserCircle,
} from "react-icons/fa";
import { MdMedicalServices, MdOutlineSettings } from "react-icons/md";

import SubMenu from "antd/es/menu/SubMenu";
import Image from "next/image";
import Link from "next/link";
import { BiPieChartAlt2 } from "react-icons/bi";
import { BsMicrosoftTeams } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { FaTag } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";
import Logo from "../../../../../public/images/LogoFinal.png";

const { Header, Sider, Content } = Layout;

const isAdmin = true;
const isDoctor = false;
const isUser = !isAdmin && !isDoctor;

const adminMenuItems = [
  {
    path: "/admin/dashboard", // For admin, the default route is "/"
    title: "Admin Dashboard",
    icon: <BiPieChartAlt2 size={18} color="white" />,
    activeIcon: <FaChartPie size={18} color="white" />,
  },
  {
    path: "/admin/dashboard/patientManagement",
    title: "Patients",
    icon: <FaRegUserCircle size={18} color="white" />,
    activeIcon: <FaUserCircle size={18} color="white" />,
  },
  {
    path: "/admin/dashboard/service",
    title: "Create Services",
    icon: <MdMedicalServices size={18} color="white" />,
    activeIcon: <MdMedicalServices size={18} color="white" />,
  },
  {
    path: "/admin/dashboard/doctors",
    title: "Doctors",
    icon: <BsMicrosoftTeams size={18} color="white" />,
    activeIcon: <BsMicrosoftTeams size={18} color="white" />,
  },
  {
    path: "/admin/dashboard/upcomingConsultant",
    title: "Upcoming Consultant",
    icon: <FaTag size={18} color="white" />,
    activeIcon: <FaTag size={18} color="white" />,
  },
  {
    path: "/admin/dashboard/settings",
    title: "Settings",
    icon: <MdOutlineSettings size={18} color="white" />,
    activeIcon: <MdOutlineSettings size={18} color="white" />,
    children: [
      {
        path: "/admin/dashboard/settings/personalInformation",
        title: "Personal Information",
        icon: <FaRegUserCircle size={18} color="white" />,
        activeIcon: <FaUserCircle size={18} color="white" />,
      },
      {
        path: "/admin/dashboard/settings/faq",
        title: "FAQ",
        icon: <FaLock size={18} color="white" />,
        activeIcon: <FaLock size={18} color="white" />,
      },
      {
        path: "/admin/dashboard/settings/termsAndCondition",
        title: "Terms & Conditions",
        icon: <CiCreditCard1 color="white" size={18} />,
        activeIcon: <IoIosCard color="white" size={18} />,
      },
    ],
  },
];

const doctorMenuItems = [
  {
    path: "/dashboard", // For users, the default route is "/userDashboard"
    title: "Doctor Dashboard",
    icon: <BiPieChartAlt2 size={18} color="white" />,
    activeIcon: <FaChartPie size={18} color="white" />,
  },
  {
    path: "/dashboard/appointment",
    title: "Appointment",
    icon: <FaRegUserCircle size={18} color="white" />,
    activeIcon: <FaUserCircle size={18} color="white" />,
  },
  // {
  //   path: "/reSchedule",
  //   title: "Re-Schedule",
  //   icon: <FaRegUserCircle size={18} color="white" />,
  //   activeIcon: <FaUserCircle size={18} color="white" />,
  // },
  {
    path: "/dashboard/settings",
    title: "Settings",
    icon: <MdOutlineSettings size={18} color="white" />,
    activeIcon: <MdOutlineSettings size={18} color="white" />,
    children: [
      {
        path: "/dashboard/settings/personalInformation",
        title: "Personal Information",
        icon: <FaRegUserCircle size={18} color="white" />,
        activeIcon: <FaUserCircle size={18} color="white" />,
      },
    ],
  },
];
const userMenuItems = [
  {
    path: "/dashboard", // For users, the default route is "/userDashboard"
    title: "User Dashboard",
    icon: <BiPieChartAlt2 size={18} color="white" />,
    activeIcon: <FaChartPie size={18} color="white" />,
  },
  {
    path: "/dashboard/consultant-history",
    title: "Consultant History",
    icon: <FaRegUserCircle size={18} color="white" />,
    activeIcon: <FaUserCircle size={18} color="white" />,
  },
  // {
  //   path: "/reSchedule",
  //   title: "Re-Schedule",
  //   icon: <FaRegUserCircle size={18} color="white" />,
  //   activeIcon: <FaUserCircle size={18} color="white" />,
  // },
  {
    path: "/dashboard/settings",
    title: "Settings",
    icon: <MdOutlineSettings size={18} color="white" />,
    activeIcon: <MdOutlineSettings size={18} color="white" />,
    children: [
      {
        path: "/dashboard/settings/personalInformation",
        title: "Personal Information",
        icon: <FaRegUserCircle size={18} color="white" />,
        activeIcon: <FaUserCircle size={18} color="white" />,
      },
    ],
  },
];

const getMenuItems = () => {
  if (isAdmin) return adminMenuItems;
  if (isDoctor) return doctorMenuItems;
  return userMenuItems;
};

const content = (
  <div className="w-40">
    <p className="mb-2">
      <Link href="/profile" className="flex items-center gap-2">
        <User2Icon size={18} /> <span className="text-md">Profile</span>
      </Link>
    </p>
    <p className="mb-3">
      <Link href="/change-password" className="flex items-center gap-2">
        <FaLock size={18} /> <span className="text-md">Change Password</span>
      </Link>
    </p>
  </div>
);

const Dashboard = ({ children }) => {
  const route = useRouter();
  // Redirect to the correct route when the component loads

  const pathname = usePathname();
  console.log(pathname);

  const handleLogout = () => {
    route.push("/");
  };

  const handleNotifications = () => {
    route.push("/admin/dashboard/notifications");
  };

  const getTitle = () => {
    // your title logic
  };

  const getMenuIcon = (icon, activeIcon, isActive) => {
    return isActive ? activeIcon : icon;
  };

  const menuItems = getMenuItems();

  return (
    <main className="bg-white">
      <Layout>
        <Sider
          width={300}
          className="sidebar-menu bg-black"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            overflow: "auto",
            zIndex: 2,
          }}
          trigger={null}
        >
          <div className="flex items-center gap-4">
            <Image
              src={Logo}
              alt="Logo"
              className=" w-24 	aspect-ratio: auto "
            />
            <h1 className="text-xl text-white font-bold flex-1">
              My Doctor Clinic
            </h1>
          </div>
          <Menu
            mode="inline"
            style={{ background: "#1E1E1E", color: "white" }}
            selectedKeys={[pathname]} // Set the selected menu based on the current route
          >
            <div className="flex flex-col justify-between h-[90vh]">
              <div className="px-4">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  if (item.children) {
                    return (
                      <SubMenu
                        key={`submenu-${index}`}
                        title={item.title}
                        icon={getMenuIcon(item.icon, item.activeIcon, isActive)}
                        style={{
                          paddingLeft: "10px",
                          color: isActive ? "red" : "#fff",
                          fontWeight: isActive ? "bold" : "normal",
                          fontSize: "16px",

                          backgroundColor: isActive ? "gray" : "transparent",
                        }}
                      >
                        {item.children.map((child, childIndex) => (
                          <Menu.Item
                            key={child.path}
                            icon={getMenuIcon(
                              child.icon,
                              child.activeIcon,
                              pathname === child.path
                            )}
                            style={{
                              color: pathname === child.path ? "red" : "#fff",
                              fontWeight:
                                pathname === child.path ? "bold" : "normal",
                              fontSize: "16px",
                            }}
                          >
                            <Link href={child.path}>{child.title}</Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    );
                  } else {
                    return (
                      <Menu.Item
                        key={item.path} // Use path as the key to ensure it's unique
                        icon={getMenuIcon(item.icon, item.activeIcon, isActive)}
                        style={{
                          paddingLeft: "10px",
                          color: isActive ? "red" : "#fff",
                          fontWeight: isActive ? "bold" : "normal",
                          fontSize: "16px",
                          marginBottom: "10px",
                          backgroundColor: isActive ? "gray" : "transparent",
                        }}
                      >
                        <Link href={item.path} className="">
                          {item.title}
                        </Link>
                      </Menu.Item>
                    );
                  }
                })}
              </div>
              <div className="flex gap-8 py-4 mt-16 px-4 w-full">
                <div className="flex gap-2 w-3/4 items-center">
                  <Popover
                    className="cursor-pointer"
                    placement="top"
                    content={content}
                  >
                    <Avatar
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "gray",
                      }}
                      icon={<User size={25} />}
                    />
                  </Popover>
                  <div className="space-y-4">
                    <h1 className="text-white">John</h1>
                    <h1 className="text-white">ex@ample.com</h1>
                  </div>
                </div>
                <Menu.Item
                  key="500"
                  icon={<LogOut size={20} />}
                  style={{ color: "red", fontSize: "16px" }}
                  onClick={handleLogout}
                />
              </div>
            </div>
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: 300 }}>
          <Header
            style={{
              position: "fixed",
              width: "calc(100% - 300px)",
              top: 0,
              left: 300,
              background: "#F6F6F6",
              height: "80px",
              paddingTop: "20px",
              zIndex: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="w-full flex justify-between">
              <div>{getTitle()}</div>
              <div
                onClick={handleNotifications}
                className="cursor-pointer"
                style={{ zIndex: 11 }}
              >
                <Badge count={5}>
                  <Bell size={30} color="gray" />
                </Badge>
              </div>
            </div>
          </Header>

          <Content
            style={{
              marginTop: "3%",
              padding: "20px",
              overflowY: "auto",
              height: `calc(100vh - 50px)`,
              background: "#1e1e1ef7",
            }}
          >
            <div className="h-full m-2 rounded p-3">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default Dashboard;
