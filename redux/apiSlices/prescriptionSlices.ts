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
      invalidatesTags: ["prescription", "appointments"],
    }),
    editPrescription: builder.mutation({
      query: ({ id, data }) => {
        console.log("data argument in editPrescription mutation", data);
        return {
          url: `/prescription/edit-prescription/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["prescription", "appointments"],
    }),
    downloadPrescription: builder.mutation({
      query: (prescriptionId) => ({
        url: `/prescription/download-prescription/${prescriptionId}`,
        method: "PUT",
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
  useDownloadPrescriptionMutation,
} = faqsSlices;
