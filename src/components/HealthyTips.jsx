import { useGetAllTipsQuery } from "../../redux/apiSlices/tips";
import TipsCard from "./TipsCard";

function HealthyTips() {
  const { data: Tips } = useGetAllTipsQuery({});
  return (
    <section id="tips" className={`py-20 bg-white`}>
      <div className="container mx-auto">
        <h1
          className={`text-black text-2xl font-normal leading-[32px] font-merri mb-6`}
        >
          Healty Tips
        </h1>

        <div className="grid grid-cols-4 gap-4">
          {Tips?.data?.slice(0, 8)?.map((tips, index) => (
            <TipsCard key={index} link={tips} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HealthyTips;
