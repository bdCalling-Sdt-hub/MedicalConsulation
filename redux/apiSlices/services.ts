import { api } from "../api/baseApi";

export const servicesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<null, unknown>({
      query: ({ id, page, limit }) => ({
        url: `/service/get-all-services`,
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

export const { useGetCategoriesQuery, useGetBooksQuery } = servicesSlices;
