import Image from "next/image";
import Link from "next/link";
import IconFacebook from "../../public/icons/IconFacebook";
import IconInsta from "../../public/icons/IconInsta";
import IconLinkedin from "../../public/icons/IconLinkedin";
import IconTwitter from "../../public/icons/IconTwitter";
// import logo from "../../public/images/logo.png";
import logo from "../../public/images/HeaderLogo.png";

function Footer() {
  return (
    <section className={`bg-primary5 pt-20`}>
      <div className="container mx-auto">
        <div>
          <h1
            className={`text-primary10 text-[36px] font-bold leading-[56px] font-merri`}
          >
            Stay Informed and
            <br /> Empowered
          </h1>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <Image
                src={logo}
                alt="logo"
                className={`my-4`}
                height={60}
                width={161.76}
              />
              <p
                className={`text-black text-xs font-merri font-normal leading-[20px]`}
              >
                Leading the way in Online <br />
                Medical
              </p>
              <p
                className={`text-black text-xs font-merri font-normal leading-[20px]`}
              >
                Consultation Excellence, <br />
                Trusted Care.
              </p>
            </div>
            <div>
              <h1
                className={`text-[20px] font-merri font-normal text-neutral10 leading-[28px] mb-3`}
              >
                Important Links
              </h1>
              <p
                className={`text-sm font-merri font-normal text-black leading-[22px] mb-1 underline`}
              >
                Consultation
              </p>
              <p
                className={`text-sm font-merri font-normal text-black leading-[22px] mb-1 underline`}
              >
                Services
              </p>
              <p
                className={`text-sm font-merri font-normal text-black leading-[22px] mb-1 underline`}
              >
                About Us
              </p>
              <Link
                href="/terms-and-conditions"
                className={`text-sm font-merri font-normal text-black leading-[22px] mb-1 underline`}
              >
                Terms & Conditions
              </Link>
            </div>
            <div>
              <h1
                className={`text-[20px] font-merri font-normal text-neutral10 leading-[28px] mb-3`}
              >
                Contact Us
              </h1>
              <div className={`gap-y-2`}>
                <p
                  className={`text-sm font-merri font-normal text-black leading-[22px] mb-1`}
                >
                  Call:
                  <span
                    className={`text-sm font-merri font-normal text-black leading-[22px] mb-1 underline`}
                  >
                    +123 4567 8974
                  </span>
                </p>

                <p
                  className={`text-sm font-merri font-normal text-black leading-[22px] mb-1 underline`}
                >
                  E-mail: mydoctorclinic@gmail.com
                </p>
                <p
                  className={`text-sm font-merri font-normal text-black leading-[22px] mb-1`}
                >
                  Address:{" "}
                  <span
                    className={`text-sm font-merri font-normal text-black leading-[22px] mb-1 underline`}
                  >
                    Street Address, Area, City, <br />
                    New York
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h1
                className={`text-[20px] font-merri font-normal text-neutral10 leading-[28px] mb-3`}
              >
                Follow Us On
              </h1>
              <div className="flex flex-row items-center gap-4">
                <IconFacebook />
                <IconInsta />
                <IconTwitter />
                <IconLinkedin />
              </div>
            </div>
          </div>
        </div>
        <div className={`border-t border-t-primary1 py-8 mt-10`}>
          <h1 className={`text-right text-neutral8`}>
            © 2024 All Rights Reserved by My Doctor Clinic
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Footer;
