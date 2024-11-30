import React, { useState } from "react";

function UserConsentAgreement({ onConsentChange }) {
  const [consents, setConsents] = useState({
    termsAndConditions: false,
    dataSharing: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedConsents = { ...consents, [name]: checked };
    setConsents(updatedConsents);
    onConsentChange(updatedConsents);
  };

  return (
    <div className="gap-4">
      <h1 className="text-secondaryBlack text-[20px] font-merri font-normal mb-6">
        User Consent Agreement
      </h1>
      <p className="text-sm text-offBlack font-normal font-roboto mb-4">
        By using MyDoctorClinic and providing your personal data, you consent to
        the collection, processing, and storage of your information. You
        acknowledge that this consent is given freely, and you permit
        MyDoctorClinic to utilize your data as outlined below.
      </p>
      <p className="text-sm text-offBlack font-normal font-roboto mb-4">
        By agreeing to this policy, you authorize MyDoctorClinic to use, store,
        and process your personal information for improving site functionality,
        delivering personalized experiences, and providing services offered on
        the platform.
      </p>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          name="termsAndConditions"
          checked={consents.termsAndConditions}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label className="text-sm text-offBlack font-roboto">
          I agree with the terms and conditions of MyDoctorClinic
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          name="dataSharing"
          checked={consents.dataSharing}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label className="text-sm text-offBlack font-roboto">
          I consent to sharing my data with MyDoctorClinic
        </label>
      </div>
    </div>
  );
}

export default UserConsentAgreement;
