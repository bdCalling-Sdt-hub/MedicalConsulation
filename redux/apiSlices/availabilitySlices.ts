import { api } from "../api/baseApi";

export const availabilitySlices = api.injectEndpoints({
  endpoints: (builder) => ({
    // getAllServices: builder.query({
    //   query: ({ id, page, limit, hasDateTime }) => ({
    //     url: `service/get-all-services?page=${page}&limit=${limit}&hasDateTime=${hasDateTime}`,
    //   }),
    //   providesTags: ["availabilities"],
    // }),
    getAvailabilityByDoctorId: builder.query({
      query: (id) => ({
        url: `/availability/get-availability-by-doctorId/${id}`,
      }),
      providesTags: ["availabilities"],
    }),

    deletedAvailability: builder.mutation({
      query: (id) => ({
        url: `/availability/delete-availability-by-id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["availabilities"],
    }),
    addAvailability: builder.mutation({
      query: (data) => ({
        url: `/availability/add-availability`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["availabilities"],
    }),
  }),
});

export const {
  useAddAvailabilityMutation,
  //   useGetAllServicesQuery,
  //   useLazyGetAllServicesQuery,
  useGetAvailabilityByDoctorIdQuery,
  useDeletedAvailabilityMutation,
} = availabilitySlices;
