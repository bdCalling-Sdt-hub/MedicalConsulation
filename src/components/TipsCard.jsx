import Image from "next/image";
import React from "react";

function TipsCard({ placeholderImage }) {
  return (
    <div className={`border border-neutral4`}>
      <Image src={placeholderImage} alt="tips" placeholder="blur" />
      <div className={`pl-4 py-4`}>
        <h3
          className={`text-secondaryBlack font-merri font-normal text-base leading-[24px] mb-2`}
        >
          Title goes here
        </h3>
        <p
          className={`text-offBlack text-sm font-normal font-merri leading-[22px]`}
        >
          www.website.com
        </p>
      </div>
    </div>
  );
}

export default TipsCard;
