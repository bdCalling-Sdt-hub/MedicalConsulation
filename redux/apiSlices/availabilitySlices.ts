import { api } from "../api/baseApi";

export const availabilitySlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAvailabilities: builder.query({
      query: ({ id, page, limit, dateTime }) => ({
        url: `availability/get-all-availabilities?page=${page}&limit=${limit}&dateTime=${dateTime}`,
      }),
      providesTags: ["availabilities"],
    }),
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
  useGetAllAvailabilitiesQuery,
  //   useLazyGetAllServicesQuery,
  useGetAvailabilityByDoctorIdQuery,
  useDeletedAvailabilityMutation,
} = availabilitySlices;
