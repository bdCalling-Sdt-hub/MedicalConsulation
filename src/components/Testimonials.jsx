import { Avatar, Card, Rate, Row, Typography } from "antd";

import { useGetAllReviewsQuery } from "../../redux/apiSlices/reviewSlices";

const { Text } = Typography;

function Testimonials() {
  const { data: reviews } = useGetAllReviewsQuery({});

  console.log(reviews);

  return (
    <section id="testimonials" className={`py-20 bg-primary1 my-12`}>
      <div className="container mx-auto">
        <h1
          className={`text-primary10 text-[32px] leading-[22px] font-merri mb-6`}
        >
          What our Client Say
        </h1>

        <div className="grid grid-cols-4 gap-4 items-center">
          {reviews?.data?.slice(0, 12)?.map((item, index) => {
            return (
              <Card className="bg-white flex flex-col" key={index}>
                <div className="flex flex-col gap-4">
                  <Row justify="space-between" align="middle">
                    <div className="flex items-center gap-3">
                      <Avatar>A</Avatar>
                      <Text strong>Abir Hossain</Text>
                    </div>
                    <Rate
                      style={{ fontSize: "12px" }}
                      disabled
                      value={item.rating}
                    />
                  </Row>

                  <Text strong>{item.review}</Text>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
