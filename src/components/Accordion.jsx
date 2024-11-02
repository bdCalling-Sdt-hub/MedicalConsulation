import { Collapse } from "antd";

const text = `
  This website allows users to transfer funds between wallets securely and efficiently. It simplifies peer-to-peer financial transactions with minimal fees and maximum security.
`;
const Accordion = ({ faqs }) => {
  const collapseData = faqs?.map((item) => {
    return {
      key: item.id,
      label: item.question,
      children: (
        <p className="font-merri font-normal text-base text-offBlack">
          {item.answer}
        </p>
      ),
    };
  });

  return (
    <>
      <Collapse
        size="small"
        className={`font-merri font-normal text-sm text-secondaryBlack`}
        items={collapseData}
      />
    </>
  );
};
export default Accordion;
