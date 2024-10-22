import { api } from "../api/baseApi";

export const paymentSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentRecords: builder.query<null , unknown>({
            query: ({id,page,limit}) => ({
                url: `/payments`,
              
            }),
            providesTags : ["payment"]
        }),
      
        paymentIntent: builder.mutation({
            query: (data) => ({
                url: `/payments/create-payment-intent`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["payment"]
          }),
    }),
})


export const {
useGetPaymentRecordsQuery,usePaymentIntentMutation
 } = paymentSlices;