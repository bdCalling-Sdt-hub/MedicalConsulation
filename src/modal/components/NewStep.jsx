import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

function NewStep({ setExtraInfo, extraInfo, user }) {
  return (
    <div className={`   gap-4`}>
      <div className={`col-span-2`}>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Your unique ID
          </p>
          <Input
            type="number"
            value={extraInfo?.nhsNumber}
            defaultValue={user?.nhsNumber}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, nhsNumber: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Your unique ID"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Full Name
          </p>
          <Input
            type="text"
            value={extraInfo?.fullName}
            defaultValue={user?.fullName}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, fullName: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Full Name"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Full Address including Postal Code
          </p>
          <Input
            type="text"
            value={extraInfo?.address}
            defaultValue={user?.address}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, address: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Full Address including Postal Code"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Date of Birth
          </p>
          <Input
            type="date"
            value={extraInfo?.dateOfBirth}
            defaultValue={user?.dateOfBirth}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, dateOfBirth: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Date of Birth"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Current NHS General Practitioner Details
          </p>
          <Input
            type="text"
            value={extraInfo?.gpDetails}
            defaultValue={user?.gpDetails}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, gpDetails: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Current NHS General Practitioner Details"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Name of Doctor
          </p>
          <Input
            type="text"
            value={extraInfo?.doctorName}
            defaultValue={user?.doctorName}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, doctorName: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Name of Doctor"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Surgery Address
          </p>
          <Input
            type="text"
            value={extraInfo?.surgeryAddress}
            defaultValue={user?.surgeryAddress}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, surgeryAddress: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Surgery Address"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Surgery telephone number
          </p>
          <Input
            type="text"
            value={extraInfo?.surgeryPhoneNumber}
            defaultValue={user?.surgeryPhoneNumber}
            onChange={(e) => {
              setExtraInfo({
                ...extraInfo,
                surgeryPhoneNumber: e.target.value,
              });
            }}
            id="cardNumber"
            placeholder="Enter your Surgery telephone number"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Surgery email address
          </p>
          <Input
            type="email"
            value={extraInfo?.surgeryEmail}
            defaultValue={user?.surgeryEmail}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, surgeryEmail: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Surgery email address"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <h1
          className={`text-secondaryBlack text-[20px] font-merri font-normal mb-6`}
        >
          Let us know your problem
        </h1>
        <p className={`text-sm text-offBlack font-normal font-roboto`}>
          This is optional you can skip this step and continue for next step
        </p>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Describe here...
          </p>
          <TextArea
            value={extraInfo?.description}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, description: e.target.value });
            }}
            placeholder="Autosize height based on content lines"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
            rows={7}
          />
        </div>
      </div>
    </div>
  );
}

export default NewStep;
