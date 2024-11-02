import { api } from "../api/baseApi";

export const notesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotesByAppointmentId: builder.query({
      query: (id) => ({
        url: `/note/get-notes-by-appointment/${id}`,
      }),
      providesTags: ["notes"],
    }),
    get1NoteByAppointmentId: builder.query({
      query: (id) => ({
        url: `/appointment/get-appointment-by-id/${id}`,
      }),
      providesTags: ["notes"],
    }),
    getNoteByPatientId: builder.query({
      query: (id) => ({
        url: `/appointment/get-appointment-by-patientId/${id}`,
      }),
      providesTags: ["notes"],
    }),
    getNoteByDoctorId: builder.query({
      query: (id) => ({
        url: `/appointment/get-appointment-by-doctorId/${id}`,
      }),
      providesTags: ["notes"],
    }),

    addNote: builder.mutation({
      query: (data) => ({
        url: `/note/add-note`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notes", "appointments"],
    }),
    editNote: builder.mutation({
      query: ({ id, data }) => ({
        url: `/note/edit-note/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["notes", "appointments"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/note/delete-note/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notes"],
    }),
  }),
});

export const {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useEditNoteMutation,
  useGetNotesByAppointmentIdQuery,
  useGet1NoteByAppointmentIdQuery,
  useLazyGet1NoteByAppointmentIdQuery,
  useGetNoteByDoctorIdQuery,
  useGetNoteByPatientIdQuery,
} = notesSlices;
