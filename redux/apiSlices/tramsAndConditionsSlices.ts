import { api } from "../api/baseApi";

export const tramsAndConditionSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndCondition: builder.query({
      query: () => ({
        url: `/terms-of-service/get-terms-of-service`,
      }),
      providesTags: ["payment"],
    }),

    addTermsAndCondition: builder.mutation({
      query: (id) => ({
        url: `/terms-of-service/add-terms-of-service`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useGetTermsAndConditionQuery, useAddTermsAndConditionMutation } =
  tramsAndConditionSlices;
