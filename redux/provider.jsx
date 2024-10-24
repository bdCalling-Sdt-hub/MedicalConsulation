// store/provider.tsx
"use client"; // This makes sure this file is a Client Component

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import ContextApi from "../context/ContextApi";
import store from "./store";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ContextApi>{children}</ContextApi>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </Provider>
  );
};

export default Providers;
