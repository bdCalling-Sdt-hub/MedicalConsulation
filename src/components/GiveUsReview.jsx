import { Button, Card, Form, Input, Rate, Typography, message } from "antd";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAddReviewMutation } from "../../redux/apiSlices/reviewSlices";

const { Title, Text } = Typography;
const { TextArea } = Input;

const GiveUsReview = () => {
  const [addReview] = useAddReviewMutation({});
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.user);
  // console.log(user);
  const handleSubmit = (values) => {
    console.log(values);
    addReview(values).then((res) => {
      console.log(res);
      if (res.data) {
        message.success(res.data?.message);
      }
      if (res.error) {
        console.log(res.error);
        message.error(res?.error?.data?.message);
      }
    });
  };

  useEffect(() => {
    form.setFieldValue("userId", user._id);
  }, [form, user._id]);

  return (
    // Add your review form here
    <div
      style={{
        display: user?._id ? "" : "none",
      }}
      className={`flex justify-center bg-primary1 py-12`}
    >
      <div className="container">
        <h1
          className={`text-black text-2xl font-normal leading-[32px] font-merri mb-6`}
        >
          Give Us a Review
        </h1>
        <Card
          className="w-1/2"
          style={{ margin: "20px auto", padding: "20px" }}
        >
          <Title level={3}>We Value Your Feedback</Title>
          <Text>
            Your feedback helps us improve our service. Please rate us and share
            your thoughts below.
          </Text>

          <Form
            layout="vertical"
            form={form}
            style={{ marginTop: "20px" }}
            onFinish={handleSubmit}
          >
            {/* <Form.Item label="Your Name">
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
            </Form.Item>
*/}
            <Form.Item name="userId" style={{ display: "none" }}>
              <Input />
            </Form.Item>

            <Form.Item
              name="rating"
              label="Rate Us"
              rules={[{ required: true, message: "Please give us a rating!" }]}
            >
              <Rate />
            </Form.Item>

            <Form.Item
              name="review"
              label="Your Review"
              rules={[{ required: true, message: "Please give us a review!" }]}
            >
              <TextArea
                rows={4}
                placeholder="Share your thoughts about our service..."
              />
            </Form.Item>

            <Button
              htmlType="submit"
              className="bg-primary6 text-white hover:bg-primary5"
              type="text"
            >
              Submit Review
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default GiveUsReview;
