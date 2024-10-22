import Image from "next/image";
import user from "../../public/images/user.jpg";

function Testimonials() {
  return (
    <section id="testimonials" className={`py-20 bg-primary1`}>
      <div className="container mx-auto">
        <h1
          className={`text-primary10 text-[32px] leading-[22px] font-merri mb-6`}
        >
          What our Client Say
        </h1>

        <div className="flex flex-row gap-4 items-center">
          <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
            <div className={`flex flex-row items-center gap-2 `}>
              <Image
                src={user}
                alt="user"
                className={`w-12 h-12 rounded-full`}
              />
              <h1
                className={`text-secondaryBlack font-roboto font-bold text-sm`}
              >
                Amena Akhter
              </h1>
            </div>
            <p
              className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
            >
              Dr. John Michael was attentive and thorough during my
              consultation. He took the time to explain everything clearly and
              made me feel comfortable throughout the process. I highly
              recommend him for anyone seeking professional and compassionate
              care.
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
            <div className={`flex flex-row items-center gap-2 `}>
              <Image
                src={user}
                alt="user"
                className={`w-12 h-12 rounded-full`}
              />
              <h1
                className={`text-secondaryBlack font-roboto font-bold text-sm`}
              >
                Amena Akhter
              </h1>
            </div>
            <p
              className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
            >
              Dr. John Michael was attentive and thorough during my
              consultation. He took the time to explain everything clearly and
              made me feel comfortable throughout the process. I highly
              recommend him for anyone seeking professional and compassionate
              care.
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
            <div className={`flex flex-row items-center gap-2 `}>
              <Image
                src={user}
                alt="user"
                className={`w-12 h-12 rounded-full`}
              />
              <h1
                className={`text-secondaryBlack font-roboto font-bold text-sm`}
              >
                Amena Akhter
              </h1>
            </div>
            <p
              className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
            >
              Dr. John Michael was attentive and thorough during my
              consultation. He took the time to explain everything clearly and
              made me feel comfortable throughout the process. I highly
              recommend him for anyone seeking professional and compassionate
              care.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center mt-4">
          <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
            <div className={`flex flex-row items-center gap-2 `}>
              <Image
                src={user}
                alt="user"
                className={`w-12 h-12 rounded-full`}
              />
              <h1
                className={`text-secondaryBlack font-roboto font-bold text-sm`}
              >
                Amena Akhter
              </h1>
            </div>
            <p
              className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
            >
              Dr. John Michael was attentive and thorough during my
              consultation. He took the time to explain everything clearly and
              made me feel comfortable throughout the process. I highly
              recommend him for anyone seeking professional and compassionate
              care.
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
            <div className={`flex flex-row items-center gap-2 `}>
              <Image
                src={user}
                alt="user"
                className={`w-12 h-12 rounded-full`}
              />
              <h1
                className={`text-secondaryBlack font-roboto font-bold text-sm`}
              >
                Amena Akhter
              </h1>
            </div>
            <p
              className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
            >
              Dr. John Michael was attentive and thorough during my
              consultation. He took the time to explain everything clearly and
              made me feel comfortable throughout the process. I highly
              recommend him for anyone seeking professional and compassionate
              care.
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
            <div className={`flex flex-row items-center gap-2 `}>
              <Image
                src={user}
                alt="user"
                className={`w-12 h-12 rounded-full`}
              />
              <h1
                className={`text-secondaryBlack font-roboto font-bold text-sm`}
              >
                Amena Akhter
              </h1>
            </div>
            <p
              className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
            >
              Dr. John Michael was attentive and thorough during my
              consultation. He took the time to explain everything clearly and
              made me feel comfortable throughout the process. I highly
              recommend him for anyone seeking professional and compassionate
              care.
            </p>
          </div>
          <div className="bg-white border border-neutral4 p-4 rounded-sm flex flex-col justify-between flex-1">
            <div className={`flex flex-row items-center gap-2 `}>
              <Image
                src={user}
                alt="user"
                className={`w-12 h-12 rounded-full`}
              />
              <h1
                className={`text-secondaryBlack font-roboto font-bold text-sm`}
              >
                Amena Akhter
              </h1>
            </div>
            <p
              className={`font-merri font-normal text-sm text-offBlack mt-4 pb-4`}
            >
              Dr. John Michael was attentive and thorough during my
              consultation. He took the time to explain everything clearly and
              made me feel comfortable throughout the process. I highly
              recommend him for anyone seeking professional and compassionate
              care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
