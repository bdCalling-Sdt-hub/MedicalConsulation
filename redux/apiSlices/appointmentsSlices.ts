import { api } from "../api/baseApi";

export const appointmentsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointment: builder.query({
      query: () => "/appointment/get-all-appointments",
      providesTags: ["appointments"],
    }),
    getAppointmentById: builder.query({
      query: (id) => `/appointment/get-appointment-by-id/${id}`,
      providesTags: ["appointments"],
    }),
    getAppointmentPatientById: builder.query({
      query: (id) => `/appointment/get-appointment-by-patientId/${id}`,
      providesTags: ["appointments"],
    }),
    getAppointmentDoctorById: builder.query({
      query: (id) => `/appointment/get-appointment-by-doctorId/${id}`,
      providesTags: ["appointments"],
    }),
    cancelAppointment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/appointment/cancel-appointment-by-id/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
    completeAppointment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/appointment/complete-appointment-by-id/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
    bookCreateAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointment/book-service`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
    addZoomLink: builder.mutation({
      query: (data) => ({
        url: `/appointment/add-zoom-link`,
        method: "POST",
        body: data,
      }),
    }),
    checkLogin: builder.mutation({
      query: (data) => ({
        url: `/appointment/check-login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
  }),
});

export const {
  useAddZoomLinkMutation,
  useBookCreateAppointmentMutation,
  useCancelAppointmentMutation,
  useCheckLoginMutation,
  useCompleteAppointmentMutation,
  useGetAllAppointmentQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentDoctorByIdQuery,
  useGetAppointmentPatientByIdQuery,
  useLazyGetAppointmentByIdQuery,
} = appointmentsSlices;
