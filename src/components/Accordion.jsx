import React from "react";
import { Collapse, Divider } from "antd";
const text = `
  This website allows users to transfer funds between wallets securely and efficiently. It simplifies peer-to-peer financial transactions with minimal fees and maximum security.
`;
const Accordion = () => (
  <>
    <Collapse
      size="small"
      className={`font-merri font-normal text-sm text-secondaryBlack`}
      items={[
        {
          key: "1",
          label: "What is the purpose of this Website?",
          children: (
            <p className="font-merri font-normal text-base text-offBlack">
              {text}
            </p>
          ),
        },
        {
          key: "2",
          label: "This is panel header 2",
          children: (
            <p className="font-merri font-normal text-base text-offBlack">
              {text}
            </p>
          ),
        },
        {
          key: "3",
          label: "This is panel header 3",
          children: (
            <p className="font-merri font-normal text-base text-offBlack">
              {text}
            </p>
          ),
        },
        {
          key: "5",
          label: "This is panel header 5",
          children: (
            <p className="font-merri font-normal text-base text-offBlack">
              {text}
            </p>
          ),
        },
        {
          key: "6",
          label: "This is panel header 2",
          children: (
            <p className="font-merri font-normal text-base text-offBlack">
              {text}
            </p>
          ),
        },
        {
          key: "2",
          label: "This is panel header 6",
          children: (
            <p className="font-merri font-normal text-base text-offBlack">
              {text}
            </p>
          ),
        },
      ]}
    />
  </>
);
export default Accordion;
