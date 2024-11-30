import Image from "next/image";
import Link from "next/link";
import about from "../../public/images/about.png";

function AboutUs2() {
  return (
    <section className={`w-full bg-primary2 p-12`}>
      <div className="container mx-auto flex flex-row gap-8 justify-evenly ">
        <div className="flex-1 justify-items-end">
          <div className=" w-[85%]  ">
            <h1 className=" !font-Abril text-6xl text-primary10 font-semibold  ">
              Immediate consultation with doctors” – 7am – 00:00 every hour,
              every day
            </h1>
            <div className="mt-12 w-full justify-items-center">
              <Link
                href="/booking"
                className="text-white bg-primary10 !font-merri text-base py-2 px-6 rounded-sm font-normal "
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <Image src={about} alt="about" />
        </div>
      </div>
    </section>
  );
}

export default AboutUs2;
