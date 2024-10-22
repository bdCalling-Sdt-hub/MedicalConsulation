import Image from "next/image";
import Link from "next/link";
import about from "../../public/images/about.png";

function AboutUs2() {
  return (
    <section className={`py-20 bg-primary2`}>
      <div className="container mx-auto flex flex-row gap-4">
        <div className="w-4/12">
          <h1 className={`text-primary10 text-[48px] font-abril font-bold`}>
            15 Minutes
            <br />
            Consultation
            <br />
            with Specialist
            <br />
            Doctor
          </h1>
          <p className={`text-black font-normal text-lg `}>
            Every hour, every day
          </p>
          <Link
            href="/#book"
            className={`text-white bg-primary10 font-merri text-sm py-2 px-6 rounded-sm font-normal mt-7`}
          >
            Book Now
          </Link>
        </div>
        <div className="">
          <Image src={about} alt="about" />
        </div>
      </div>
    </section>
  );
}

export default AboutUs2;
