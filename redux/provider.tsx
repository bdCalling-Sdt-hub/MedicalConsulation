// store/provider.tsx
"use client"; // This makes sure this file is a Client Component

import { Provider } from "react-redux";
import store from "./store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
