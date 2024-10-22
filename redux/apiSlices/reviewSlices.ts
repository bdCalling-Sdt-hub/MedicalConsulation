import { api } from "../api/baseApi";

export const reviewSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<null, unknown>({
      query: ({ id, page, limit }) => ({
        url: `/review/all-reviews`,
      }),
      providesTags: ["review"],
    }),
    getReviewById: builder.query({
      query: (id) => ({
        url: `/review/get-one-review/${id}`,
      }),
      providesTags: ["review"],
    }),
    getReviewByUser: builder.query({
      query: (id) => ({
        url: `/review/review-by-user`,
        body: id,
      }),
      providesTags: ["review"],
    }),

    addReview: builder.mutation({
      query: (data) => ({
        url: `/review/add-review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/update-review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/delete-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetReviewByUserQuery,
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
} = reviewSlices;
