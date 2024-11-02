"use client";

import "../../dashboard.css";

import { Layout, Menu } from "antd";
import { Bell, LogOut, User2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { BiLeftArrow, BiPieChartAlt2 } from "react-icons/bi";
import {
  FaChartPie,
  FaLock,
  FaRegUserCircle,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import SubMenu from "antd/es/menu/SubMenu";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSettings } from "react-icons/md";
import Logo from "../../../../../public/images/LogoFinal.png";
import { clearUser } from "../../../../../redux/apiSlices/userSlices";

const { Header, Sider, Content } = Layout;

const userMenuItems = [
  {
    path: "/patient/dashboard", // For users, the default route is "/userDashboard"
    title: "User Dashboard",
    icon: <BiPieChartAlt2 size={18} color="white" />,
    activeIcon: <FaChartPie size={18} color="white" />,
  },
  {
    path: "/patient/dashboard/consultant",
    title: "Consultant",
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
    path: "/patient/dashboard/settings",
    title: "Settings",
    icon: <MdOutlineSettings size={18} color="white" />,
    activeIcon: <MdOutlineSettings size={18} color="white" />,
    children: [
      {
        path: "/patient/dashboard/settings/personalInformation",
        title: "Personal Information",
        icon: <FaRegUserCircle size={18} color="white" />,
        activeIcon: <FaUserCircle size={18} color="white" />,
      },
    ],
  },
];

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
  const dispatch = useDispatch();
  const pathname = usePathname();
  console.log(pathname);

  const handleNotifications = () => {
    route.push("/patient/dashboard/notifications");
  };

  const getTitle = () => {
    // your title logic
  };
  const userProfile = useSelector((state) => state.user?.user);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Dispatch action to clear user state in Redux
    dispatch(clearUser());

    // Remove cookies for token and role
    Cookies.remove("token");
    Cookies.remove("userRole");

    route.push("/");

    // Optionally redirect or update UI
    // For example, you can use next/router for navigation
  };

  const getMenuIcon = (icon, activeIcon, isActive) => {
    return isActive ? activeIcon : icon;
  };

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
                {userMenuItems.map((item, index) => {
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
              <div>
                <div className="flex gap-8 justify-between py-4  px-4 w-full">
                  <div className="flex gap-2 w-3/4 items-center border-l-2 pl-2 border-l-white">
                    <div className="space-y-4 ">
                      <h1 className="text-white">Go to Home</h1>
                    </div>
                  </div>
                  <Menu.Item
                    key="500"
                    icon={<BiLeftArrow size={20} />}
                    style={{ color: "white", fontSize: "16px", flex: 1 }}
                    onClick={() => {
                      route.push("/");
                    }}
                  />
                </div>
                <div className="flex gap-8 py-4  px-4 w-full">
                  <div className="flex gap-2 w-3/4 items-center border-l-2 pl-2 border-l-white">
                    <div className="space-y-4 ">
                      <h1 className="text-white">{userProfile?.name}</h1>
                      <h1 className="text-white">{userProfile?.email}</h1>
                    </div>
                  </div>
                  <Menu.Item
                    key="500"
                    icon={<LogOut size={20} />}
                    style={{ color: "red", fontSize: "16px", flex: 1 }}
                    onClick={handleLogout}
                  />
                </div>
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
                <Bell size={30} color="gray" />
                {/* <Badge count={5}>
                </Badge> */}
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
