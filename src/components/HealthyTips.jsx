import TipsCard from "./TipsCard";
import placeholderImage from "../../public/images/placeholder.png";

function HealthyTips() {
  return (
    <section id="tips" className={`py-20 bg-white`}>
      <div className="container mx-auto">
        <h1
          className={`text-black text-2xl font-normal leading-[32px] font-merri mb-6`}
        >
          Healty Tips
        </h1>

        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <TipsCard key={index} placeholderImage={placeholderImage} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HealthyTips;
