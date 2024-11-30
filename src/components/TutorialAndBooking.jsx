import BookNow from "../modal/BookNow";
import VideoPlayer from "../components/VideoPlayer";

const TutorialAndBooking = () => {
  return (
    <div className="bg-[#fff] w-full">
      <div className="container mx-auto flex w-full">
        <div className="w-1/2">
          <VideoPlayer />
        </div>
        <div className="w-1/2">
          <BookNow />{" "}
        </div>
        {/* <VideoPlayer />
        <BookNow /> */}
      </div>
    </div>
  );
};

export default TutorialAndBooking;
