import { api } from "../api/baseApi";

export const appointmentsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppointment: builder.query({
      query: () => "appointment",
    }),
    postAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointment`,
        method: "POST",
        body: data,
      }),
    }),
    deleteAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointment`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});
