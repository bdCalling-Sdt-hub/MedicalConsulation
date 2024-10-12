"use client";
import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const currentLocationPath = usePathname();

  // JSON data for navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <section className="bg-primary6">
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
                  className={`font-normal ${
                    currentLocationPath === item.path
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
          >
            Sign In
          </button>
          <button
            className={`text-white bg-black font-merri text-sm py-2 px-6 rounded-sm font-normal`}
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
}

export default Header;
