"use client";

import { createContext, useEffect } from "react";

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
    }
  }, [user]);

  return (
    <ContextProvider.Provider value={values}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextApi;
