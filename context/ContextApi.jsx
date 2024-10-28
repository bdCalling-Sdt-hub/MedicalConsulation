"use client";

import { createContext, useEffect } from "react";

import Cookies from "js-cookie"; // Import js-cookie
import { useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "../redux/apiSlices/authSlice";
import { setUser } from "../redux/apiSlices/userSlices";

const ContextProvider = createContext(null);

const ContextApi = ({ children }) => {
  const token = localStorage?.getItem("token");

  const { data: user } = useGetUserProfileQuery(
    {},
    {
      skip: !token,
    }
  );
  const dispatch = useDispatch();

  const values = {};

  useEffect(() => {
    if (user) {
      dispatch(setUser(user?.data));

      // Set the token in a cookie
      Cookies.set("token", token, { expires: 1, path: "/" }); // Expires in 1 day
      Cookies.set("userRole", user?.data?.role, { expires: 1, path: "/" }); // Optional: Set user role
    }
  }, [user]);

  return (
    <ContextProvider.Provider value={values}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextApi;
