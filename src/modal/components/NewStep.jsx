import { Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

function NewStep({ setExtraInfo, extraInfo, user }) {
  console.log(user?.dateOfBirth);
  // Handle file upload changes
  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 5) {
      message.error("You can only upload up to 5 files.");
    } else {
      const pdfFiles = fileList.map((file) => file.originFileObj); // Extract raw files
      // Add `uid` and necessary metadata back to fileList
      const updatedFileList = fileList.map((file) => ({
        ...file,
        uid: file.uid || Date.now().toString(), // Ensure uid exists
        status: file.status || "done", // Add a default status
      }));
      setExtraInfo({ ...extraInfo, pdfFiles, fileList: updatedFileList });
    }
  };

  console.log("extraInfo", extraInfo);
  return (
    <div className={`   gap-4`}>
      <div className={`col-span-2`}>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Your unique ID
          </p>
          <Input
            type="number"
            value={extraInfo?.uniqueId}
            defaultValue={user?.uniqueId}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, uniqueId: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Your unique ID"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
            disabled={true}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Full Name
          </p>
          <Input
            type="text"
            value={extraInfo?.name}
            defaultValue={user?.name}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, name: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Full Name"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            Full Address
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
            defaultValue={
              user?.dateOfBirth
                ? new Date(user?.dateOfBirth).toISOString().split("T")[0]
                : ""
            }
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
            value={extraInfo?.currentNHSGPDetails}
            defaultValue={user?.currentNHSGPDetails}
            onChange={(e) => {
              setExtraInfo({
                ...extraInfo,
                currentNHSGPDetails: e.target.value,
              });
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
            value={extraInfo?.nameOfDoctor}
            defaultValue={user?.nameOfDoctor}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, nameOfDoctor: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your Name of Doctor"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            NHS Number
          </p>
          <Input
            type="text"
            value={extraInfo?.nhsNumber}
            defaultValue={user?.nhsNumber}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, nhsNumber: e.target.value });
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
            value={extraInfo?.surgeryTelephoneNumber}
            defaultValue={user?.surgeryTelephoneNumber}
            onChange={(e) => {
              setExtraInfo({
                ...extraInfo,
                surgeryTelephoneNumber: e.target.value,
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
            placeholder="Describe your problem here..."
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`}
            rows={7}
          />
        </div>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            {/* Upload Documents */}
          </p>
          <Upload
            fileList={extraInfo?.fileList || []}
            beforeUpload={(file) => {
              const isPDF = file.type === "application/pdf";
              if (!isPDF) {
                message.error(`${file.name} is not a PDF file.`);
              }
              return isPDF;
            }}
            onChange={handleFileChange}
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload Documents</Button>
          </Upload>
        </div>
      </div>
    </div>
  );
}

export default NewStep;
