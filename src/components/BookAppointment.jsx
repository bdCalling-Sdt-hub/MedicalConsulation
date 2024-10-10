import React from "react";

function BookAppointment() {
  return (
    <section className={`py-20 bg-primary10`}>
      <div className="container mx-auto">
        <div>
          <h1
            className={`text-primary2 text-[48px] font-normal font-merri text-center`}
          >
            Book an Appointment
          </h1>
          <p
            className={`text-primary3 text-base leading-[30px] font-roboto font-normal text-center mt-2`}
          >
            Connect with qualified, GMC-registered medical professionals from
            the <br />
            comfort of your home. For your convenience, we currently offer
            telephone <br />
            and video consultations tailored to your needs. Enjoy secure,
            personalized <br />
            care, and seamless integration with NHS services. Book your
            appointment <br />
            today and discover the unparalleled benefits of MyDoctorClinic.
          </p>
          <div className={`text-center`}>
            <button
              className={`text-secondaryBlack bg-primary2 text-center font-merri text-sm py-2 px-6 rounded-sm font-normal mt-7`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookAppointment;
