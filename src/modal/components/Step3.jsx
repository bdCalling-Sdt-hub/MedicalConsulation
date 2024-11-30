import { extractDateTimeParts } from "../../utils/extractDateTimeParts";

function Step3({ selectedItem, setDateTime, dateTime }) {
  if (selectedItem) {
    selectedItem.dateTimes =
      typeof selectedItem.dateTimes === "string"
        ? [selectedItem.dateTimes]
        : selectedItem.dateTimes;
  }

  return (
    <div>
      <h1
        className={`text-secondaryBlack text-[20px] font-merri font-normal mb-6`}
      >
        Schedule
      </h1>

      {/* Pick a Date */}
      <div className={`mb-6`}>
        <h1 className={`text-offBlack text-base font-merri font-normal mb-6`}>
          Pick a Date
        </h1>
        <div className="grid grid-cols-7 gap-3">
          {selectedItem?.dateTimes &&
            selectedItem?.dateTimes?.map((item, index) => (
              <div
                key={index}
                className={`h-36 flex-col flex justify-center items-center gap-y-2 cursor-pointer ${
                  dateTime?.dayOfWeek ===
                  extractDateTimeParts(item).day?.toLocaleLowerCase()
                    ? "bg-primary6"
                    : "bg-primary1"
                }`}
                onClick={() => {
                  setDateTime({
                    ...dateTime,
                    dayOfWeek:
                      extractDateTimeParts(item).day?.toLocaleLowerCase(),
                  });
                }}
              >
                <h3 className={`text-sm text-gray-600 font-merri font-normal`}>
                  {extractDateTimeParts(item).date}
                </h3>
                <h1
                  className={`text-[20px] text-gray-700 font-normal font-merri`}
                >
                  {extractDateTimeParts(item).day}
                </h1>
              </div>
            ))}
        </div>
      </div>

      {/* Pick a Time */}
      <div>
        <h1 className={`text-offBlack text-base font-merri font-normal mb-6`}>
          Pick your Time
        </h1>
        <div className="grid grid-cols-7 gap-3">
          {selectedItem?.dateTimes?.map((item, index) => (
            <div
              key={index}
              className={`h-36 flex-col flex justify-center items-center gap-y-2 cursor-pointer ${
                dateTime?.dateTime === item ? "bg-primary6" : "bg-primary1"
              }`}
              onClick={() => {
                setDateTime({ ...dateTime, dateTime: item });
              }}
            >
              <h3 className={`text-sm text-gray-600 font-merri font-normal`}>
                {extractDateTimeParts(item).period}
              </h3>
              <h1
                className={`text-[20px] text-gray-700 font-normal font-merri`}
              >
                {extractDateTimeParts(item).time}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step3;
