import Link from "next/link";

function Banner() {
  return (
    <section id="home">
      <div
        style={{ backgroundImage: "url('/images/banner.png')" }}
        className="h-[70vh] w-full bg-cover bg-center "
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1
            className={`text-primary1 text-[48px] font-merri font-black text-center leading-[61px]`}
          >
            Consult Instantly with Your Doctor <br /> from 7am to Midnight
          </h1>
          <h5
            className={`text-base font-merri font-normal text-center text-primary3 mt-3 `}
          >
            At My Doctor Clinic, we provide 24/7 access to healthcare with
            convenient phone and video <br /> consultations. Connect with a
            qualified medical professional anytime, anywhere, and receive the{" "}
            <br />
            expert guidance and support you need from the comfort of your home.
            {/* At My Doctor Clinic, we provide 24/7 access to healthcare with
            convenient phone and video consultations. <br /> Connect with a
            qualified medical professional anytime, anywhere, and receive the
            expert guidance and <br />
            support you need from the comfort of your home. */}
          </h5>
          <Link
            href="/#book"
            className={`text-secondaryBlack bg-primary6 font-bold font-merri text-xl py-2 px-6 rounded-sm mt-4`}
          >
            <h3>Consult a Patient</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
