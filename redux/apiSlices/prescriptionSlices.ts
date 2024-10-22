import { api } from "../api/baseApi";

export const faqsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptionByAppointmentId: builder.query({
      query: (id) => ({
        url: `/prescription/get-prescriptions-by-appointment/${id}`,
      }),
      providesTags: ["prescription"],
    }),

    addPrescription: builder.mutation({
      query: (data) => ({
        url: `/prescription/add-prescription`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["prescription"],
    }),
    editPrescription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/prescription/edit-prescription/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["prescription"],
    }),

    deleteFaqs: builder.mutation({
      query: (id) => ({
        url: `/prescription/delete-prescription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["prescription"],
    }),
  }),
});

export const {
  useAddPrescriptionMutation,
  useDeleteFaqsMutation,
  useGetPrescriptionByAppointmentIdQuery,
  useEditPrescriptionMutation,
} = faqsSlices;
