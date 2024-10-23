"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePaymentIntentMutation } from "../../../redux/apiSlices/paymnetSlices";

const stripePromise = loadStripe(
  "pk_test_51Q51euIE7z8j8FQDRAixwTBcDJS0zyz8wjvgZVn64nZKzjxyVSdzEPIccMiD3hND02GAHRU8y2eB92YO1tcL1PQk00M6ydxlfZ"
);
function Step4({ appointmentId }) {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
  };

  return (
    <div>
      <h1
        className={`text-secondaryBlack text-[20px] font-merri font-normal mb-6`}
      >
        Payment
      </h1>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 bg-white p-4 rounded">
          <h1 className={`text-black text-[20px] font-merri font-normal mb-6`}>
            Pay With
          </h1>

          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm appointmentId={appointmentId} />
          </Elements>
        </div>
        <div className="col-span-3 bg-transparent">
          <h1
            className={`text-black text-base font-roboto font-medium border-b border-b-offBorder pb-5`}
          >
            Consultation Summary
          </h1>

          <div
            className={`flex flex-row items-center justify-between py-2 border-t border-t-offBorder`}
          >
            <h1
              className={`text-sm text-secondaryBlack font-merri font-normal`}
            >
              Schedule:
            </h1>
            <h1
              className={`text-base text-secondaryBlack font-roboto font-semibold`}
            >
              Sunday, 02 Jan, 2024 at Morning, 11.00 am
            </h1>
          </div>

          <div
            className={`flex flex-row items-center justify-between py-2 border-t border-t-offBorder`}
          >
            <h1
              className={`text-sm text-secondaryBlack font-merri font-normal`}
            >
              Consultation Fee:
            </h1>
            <h1
              className={`text-base text-secondaryBlack font-roboto font-semibold`}
            >
              $20.00
            </h1>
          </div>

          <div
            className={`flex flex-row items-center justify-between py-2 border-t border-t-offBorder`}
          >
            <h1
              className={`text-sm text-secondaryBlack font-merri font-normal`}
            >
              Total:
            </h1>
            <h1
              className={`text-base text-secondaryBlack font-roboto font-semibold`}
            >
              $20.00
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4;

export const CheckoutForm = ({ appointmentId }) => {
  console.log(appointmentId);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const [createIntent] = usePaymentIntentMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint

    const res = await createIntent({
      paymentMethodId: "pm_card_visa",
      amount: 1099,
      appointmentId: appointmentId,
    });
    const clientSecret = res?.data?.data?.client_secret;
    if (!clientSecret) return setErrorMessage("Client Secret not found");
    const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
      payment_method: res.data.data._id,
    });

    if (paymentIntent?.paymentIntent.status === "succeeded") {
      toast.success("Payment Successful");
      console.log(paymentIntent);
    }
    setProcessing(false);
    if (paymentIntent.error) {
      setErrorMessage(error.message);
      setProcessing(false);
    } else {
      setProcessing(false);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <div>
        <button
          type="submit"
          disabled={!stripe || !elements || processing}
          className={`bg-primary6 w-full py-2 rounded text-white text-base font-merri font-normal mt-4`}
        >
          Pay $20.00
        </button>
      </div>
      {processing && <div className="text-center">Processing...</div>}
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
