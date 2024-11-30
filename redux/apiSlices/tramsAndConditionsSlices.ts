import { api } from "../api/baseApi";

export const tramsAndConditionSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndCondition: builder.query({
      query: () => ({
        url: `/terms-of-service/get-terms-of-service`,
      }),
      providesTags: ["termsAndCondition"],
    }),
    getHelp: builder.query({
      query: () => ({
        url: `/help/get-help`,
      }),
      providesTags: ["help"],
    }),
    getAbout: builder.query({
      query: () => ({
        url: `/about-us/get-about-us`,
      }),
      providesTags: ["about"],
    }),

    addTermsAndCondition: builder.mutation({
      query: (data) => ({
        url: `/terms-of-service/add-terms-of-service`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["termsAndCondition"],
    }),
    addHelp: builder.mutation({
      query: (data) => ({
        url: `/help/add-help`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["help"],
    }),
    addAboutUs: builder.mutation({
      query: (data) => ({
        url: `/about-us/add-about-us`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const {
  useGetTermsAndConditionQuery,
  useAddTermsAndConditionMutation,
  useAddAboutUsMutation,
  useAddHelpMutation,
  useGetAboutQuery,
  useGetHelpQuery,
} = tramsAndConditionSlices;
