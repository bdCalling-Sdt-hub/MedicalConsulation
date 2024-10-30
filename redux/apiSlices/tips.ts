import { api } from "../api/baseApi";

export const tipsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTips: builder.query({
      query: ({ status, page, limit }) =>
        `/tip/get-all-tips?status=${status}&page=${page}&limit=${limit}`,
      providesTags: ["tips"],
    }),

    addTips: builder.mutation({
      query: (data) => ({
        url: `/tip/add-tip`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tips"],
    }),
    updateTips: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tip/update-tip/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tips"],
    }),
    deleteTips: builder.mutation({
      query: (id) => ({
        url: `/tip/delete-tip/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tips"],
    }),
  }),
});

export const {
  useAddTipsMutation,
  useDeleteTipsMutation,
  useGetAllTipsQuery,
  useUpdateTipsMutation,
} = tipsSlices;
