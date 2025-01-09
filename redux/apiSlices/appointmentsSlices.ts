import { api } from "../api/baseApi";

export const appointmentsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointment: builder.query({
      query: ({ status, page, limit }) =>
        `/appointment/get-all-appointments?status=${status}&page=${page}&limit=${limit}`,
      providesTags: ["appointments"],
    }),
    getAppointmentById: builder.query({
      query: (id) => `/appointment/get-appointment-by-id/${id}`,
      providesTags: ["appointments"],
    }),
    getAllDocumentsByAppointmentId: builder.query({
      query: (id) => `/appointment/get-all-documents-by-appointmentId/${id}`,
      providesTags: ["appointments"],
    }),
    deleteDocumentByAppointmentId: builder.mutation({
      query: ({ id, data }) => ({
        url: `/appointment/delete-a-document-by-appointmentId/${id}`,
        body: data,
        method: "DELETE",
      }),
      invalidatesTags: ["appointments"],
    }),
    addDocumentByAppointmentId: builder.mutation({
      query: ({ id, data }) => ({
        url: `/appointment/add-document-to-appointment/${id}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["appointments"],
    }),
    addDocumentByAppointmentIdByDoctor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/appointment/add-document-to-appointment-by-doctor/${id}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["appointments"],
    }),
    getAllDocumentsByAppointmentIdByDoctor: builder.query({
      query: (id) =>
        `/appointment/get-all-documents-by-appointmentId-by-doctor/${id}`,
      providesTags: ["appointments"],
    }),
    getAppointmentPatientById: builder.query({
      query: ({ page, limit, status }) =>
        `/appointment/get-appointment-by-patientId?page=${page}&limit=${limit}&status=${status}`,
      providesTags: ["appointments"],
    }),
    getAppointmentDoctorById: builder.query({
      query: ({ page, limit, status, search }) => ({
        url: `/appointment/get-appointment-by-doctorId?page=${page}&limit=${limit}&status=${status}&search=${search}`,
      }),
      providesTags: ["appointments"],
    }),
    cancelAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointment/cancel-appointment-by-id`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
    completeAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointment/complete-appointment-by-id`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
    assignDoctorToAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointment/assign-doctor-to-appointment`,
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
    addEmailForZoomLink: builder.mutation({
      query: (data) => ({
        url: `/appointment/add-email-for-zoom-link`,
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
  useDeleteDocumentByAppointmentIdMutation,
  useGetAllAppointmentQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentDoctorByIdQuery,
  useGetAppointmentPatientByIdQuery,
  useLazyGetAppointmentByIdQuery,
  useAssignDoctorToAppointmentMutation,
  useAddEmailForZoomLinkMutation,
  useGetAllDocumentsByAppointmentIdQuery,
  useAddDocumentByAppointmentIdMutation,
  useAddDocumentByAppointmentIdByDoctorMutation,
  useGetAllDocumentsByAppointmentIdByDoctorQuery,
} = appointmentsSlices;
