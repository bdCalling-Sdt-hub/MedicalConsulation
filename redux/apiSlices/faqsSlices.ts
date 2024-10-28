import { api } from "../api/baseApi";

export const faqsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => ({
        url: `/faq/get-all-faqs`,
      }),
      providesTags: ["faqs"],
    }),

    addFaqs: builder.mutation({
      query: (data) => ({
        url: `/faq/add-faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faqs"],
    }),
    updateFaqs: builder.mutation({
      query: (data) => ({
        url: `/faq/update-faq`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["faqs"],
    }),
    deleteFaqs: builder.mutation({
      query: (id) => ({
        url: `/faq/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faqs"],
    }),
  }),
});

export const {
  useAddFaqsMutation,
  useDeleteFaqsMutation,
  useGetFaqsQuery,
  useUpdateFaqsMutation,
} = faqsSlices;
