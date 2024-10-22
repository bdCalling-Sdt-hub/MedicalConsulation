import { api } from "../api/baseApi";

export const zoomSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentRecords: builder.query<null, unknown>({
      query: ({ id, page, limit }) => ({
        url: `/payment/get-all-payment-intents`,
      }),
      providesTags: ["payment"],
    }),

    getPaymentIntentById: builder.mutation({
      query: (id) => ({
        url: `/payment/get-payment-intent`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["payment"],
    }),
    paymentIntent: builder.mutation({
      query: (data) => ({
        url: `/payment/create-payment-intent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useGetPaymentRecordsQuery, usePaymentIntentMutation } =
  zoomSlices;
