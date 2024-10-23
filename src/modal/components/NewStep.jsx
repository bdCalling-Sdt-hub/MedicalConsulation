import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

function NewStep({ setExtraInfo, extraInfo }) {
  return (
    <div className={`   gap-4`}>
      <div className={`col-span-2`}>
        <div className={`mb-4 mt-6`}>
          <p className={`text-sm text-secondaryBlack font-merri font-normal`}>
            NHS
          </p>
          <Input
            type="number"
            value={extraInfo?.nhsNumber}
            onChange={(e) => {
              setExtraInfo({ ...extraInfo, nhsNumber: e.target.value });
            }}
            id="cardNumber"
            placeholder="Enter your nhs number"
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
            required
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
