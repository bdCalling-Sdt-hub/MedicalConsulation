// store/provider.tsx
"use client"; // This makes sure this file is a Client Component

import { Provider } from "react-redux";
import ContextApi from "../context/ContextApi";
import store from "./store";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ContextApi>{children}</ContextApi>
    </Provider>
  );
};

export default Providers;
