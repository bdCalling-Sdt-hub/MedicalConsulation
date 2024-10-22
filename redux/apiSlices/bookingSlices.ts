import { api } from "../api/baseApi";

export const bookingSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<null, unknown>({
      query: ({ id, page, limit }) => ({
        url: `/categories`,
      }),
      providesTags: ["book"],
    }),
    getBooks: builder.query<null, unknown>({
      query: ({ id, page, limit }) => ({
        url: `/books`,
      }),
      providesTags: ["book"],
    }),
    // getBooks: builder.mutation({
    //     query: (data) => ({
    //         url: `/books`,
    //       method: 'POST',
    //       body: data,
    //     }),
    //     invalidatesTags : ["book"]
    //   }),
  }),
});

export const { useGetCategoriesQuery, useGetBooksQuery } = bookingSlices;
