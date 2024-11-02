import { useGetFaqsQuery } from "../../redux/apiSlices/faqsSlices";
import Accordion from "./Accordion";

function FAQ() {
  const { data: faqs } = useGetFaqsQuery({});

  // console.log(faqs);

  return (
    <section id="faq" className={`bg-white py-20`}>
      <div className="container mx-auto">
        <h1 className={`text-black text-2xl font-merri font-normal pb-6`}>
          Frequently Asked Questions
        </h1>
        <Accordion faqs={faqs?.data} />
      </div>
    </section>
  );
}

export default FAQ;
