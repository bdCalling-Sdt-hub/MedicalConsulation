import React from "react";

function NewStep() {
  return (
    <div className={`   gap-4`}>
      <div className={`col-span-2`}>
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
          <textarea  placeholder="Autosize height based on content lines"
            className={`border border-neutral5 p-2 rounded w-full mt-1 text-base text-offBlack font-merri font-normal focus:outline-none`} rows={7}>

          </textarea>
        </div>
      </div>
    </div>
  );
}

export default NewStep;
