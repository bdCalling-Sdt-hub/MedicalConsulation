import React, { useState } from "react";

function UserConsentAgreement({ onConsentChange }) {
  const [consents, setConsents] = useState({
    termsAndConditions: false,
    dataSharing: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    console.log("name", name);
    console.log("checked", checked);
    const updatedConsents = { ...consents, [name]: checked };
    setConsents(updatedConsents);
    onConsentChange(updatedConsents);
    // setConsents((prev) => {
    //   const updated = { ...prev, [name]: checked };
    //   if (onConsentChange) onConsentChange(updated);
    //   return updated;
    // });
  };

  return (
    <div className="gap-4">
      <div className="col-span-2">
        <h1 className="text-secondaryBlack text-[20px] font-merri font-normal mb-6">
          User Consent Agreement
        </h1>
        <p className="text-sm text-offBlack font-normal font-roboto mb-6">
          By using MyDoctorClinic and providing your personal data, you consent
          to the collection, processing, and storage of your information. You
          acknowledge that this consent is given freely, and you permit
          MyDoctorClinic to utilize your data as outlined below.
        </p>
        <h2 className="text-secondaryBlack text-[16px] font-merri font-normal mb-4">
          Use of Data:
        </h2>
        <p className="text-sm text-offBlack font-normal font-roboto mb-6">
          By agreeing to this policy, you authorize MyDoctorClinic to use,
          store, and process your personal information for the purposes of
          improving site functionality, delivering personalized experiences, and
          providing any services offered on the platform. This may include, but
          is not limited to, analyzing data trends, sharing anonymized data for
          research, and leveraging information for marketing and business
          development purposes.
        </p>
        <h2 className="text-secondaryBlack text-[16px] font-merri font-normal mb-4">
          User Rights and Revocation:
        </h2>
        <p className="text-sm text-offBlack font-normal font-roboto mb-6">
          You have the right to withdraw consent at any time by contacting our
          support team. However, please note that withdrawing consent may limit
          your ability to access certain features or services offered by
          MyDoctorClinic.
        </p>
        <div className="mb-4">
          <label className="text-sm text-secondaryBlack font-merri font-normal flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAndConditions"
              checked={consents.termsAndConditions}
              onChange={handleCheckboxChange}
              className="accent-neutral5"
            />
            I agree with the terms and conditions of MyDoctorClinic
          </label>
        </div>
        <div className="mb-4">
          <label className="text-sm text-secondaryBlack font-merri font-normal flex items-center gap-2">
            <input
              type="checkbox"
              name="dataSharing"
              checked={consents.dataSharing}
              onChange={handleCheckboxChange}
              className="accent-neutral5"
            />
            I consent to sharing my data with MyDoctorClinic
          </label>
        </div>
        <div className="mb-4">
          <strong className="text-sm text-secondaryBlack font-merri font-lg flex items-center gap-2">
            Please check the boxes to proceed
          </strong>
        </div>
      </div>
    </div>
  );
}

export default UserConsentAgreement;
