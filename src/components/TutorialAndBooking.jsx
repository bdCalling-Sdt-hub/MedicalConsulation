import VideoPlayer from "../components/VideoPlayer";
import BookNow from "../modal/BookNow";

const TutorialAndBooking = () => {
  return (
    <section id="book" className="bg-[#fff] w-full">
      <div className="container mx-auto flex w-full">
        <div className="w-1/2">
          <VideoPlayer />
        </div>
        <div className="w-1/2">
          <BookNow />
        </div>
        {/* <VideoPlayer />
        <BookNow /> */}
      </div>
    </section>
  );
};

export default TutorialAndBooking;
