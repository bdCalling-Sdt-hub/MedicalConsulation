import IconVerifiedSuccess from "../../public/icons/IconVerifiedSuccess";
import Image from "next/image";
import patients from "../../public/images/patients.png";

function AboutUs() {
  return (
    <section id="about" className={`py-20 bg-primary1`}>
      <div className="container mx-auto">
        <h3 className={`text-offBlack text-[20px] font-merri font-normal`}>
          About Us
        </h3>
        <h1
          className={`text-2xl text-secondaryBlack font-merri font-bold leading-[32px]`}
        >
          We Provide Best Online Doctor Consultation
          <br /> For You
        </h1>

        <p className={`text-offBlack text-base font-roboto font-normal mt-3`}>
          Experience the future of healthcare with our expert consultations.
          Connect with qualified, GMC-registered medical professionals anytime,
          anywhere. From the comfort of your home, you can get a detailed
          consultation and advice on managing your health. Our secure platform
          allows you to book online appointments with medical experts more
          efficiently than ever before. Whether you need help managing a chronic
          condition or have questions about your general well-being, our team is
          ready to support your journey to better health.
        </p>

        <div className={`mt-4`}>
          <p className={`text-neutral8 text-base font-roboto font-semibold`}>
            Key benefits of consultations:
          </p>
          <ul
            className={`text-offBlack text-base font-roboto font-normal text-2xl list-disc list-inside`}
          >
            <li>
              Accessibility: Consult with a doctor on your schedule, without the
              hassle of traveling.
            </li>
            <li>
              Comprehensive Care: Receive personalized advice and treatment
              plans on a wide range of health conditions, from common ailments
              to complex medical issues.
            </li>
            <li>
              Confidentiality: Rest assured that all your information remains
              confidential and secure.
            </li>
            <li>
              Expertise: Our highly trained professionals specialize in
              providing expert healthcare solutions tailored to your needs.
            </li>
            <li>
              Remote Prescriptions: Get prescriptions for medications through
              our online platform, delivered directly to your preferred
              pharmacy.
            </li>
          </ul>
          <p
            className={`text-offBlack text-base font-roboto font-normal text-2xl mt-4`}
          >
            We strive to offer high-quality consultations that empower you to
            take control of your health. Our experienced medical team is
            dedicated to helping you lead a healthier life with timely, expert
            medical advice.
          </p>
        </div>

        <div className="bg-white w-60 p-4 gap-4 mt-5 border border-neutral4">
          <div className={`flex flex-row items-center gap-2`}>
            <IconVerifiedSuccess />
            <h4 className={`text-black text-base font-roboto font-semibold`}>
              Get an E-Prescription
            </h4>
          </div>

          <p
            className={`text-offBlack font-regular font-merri text-sm leading-[22px] mt-3`}
          >
            We’ll provide you an E-prescription soft copy after consultation
            with Doctor
          </p>
        </div>

        <div className="bg-primary4 py-3 px-6 rounded flex-row flex items-center gap-4 mt-6">
          <Image src={patients} alt="patients" />
          <div>
            <h1 className={`text-primary10 font-bold text-base font-merri`}>
              Over 1,000+
            </h1>
            <h1 className={`text-offBlack font-normal text-xs font-merri`}>
              Satisfied Patients
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
