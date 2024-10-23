import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (token) => ({
        url: `/users/profile`,
      }),
      providesTags: ["user"],
    }),
    allUser: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/users`,
      }),
      providesTags: ["user"],
    }),
    allPatients: builder.query({
      query: ({ page = 1, limit = 10, search }) => ({
        url: `/users/patients?search=${search}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["user"],
    }),
    allDoctor: builder.query({
      query: (token) => ({
        url: `/users/doctors`,
      }),
      providesTags: ["user"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/get-one-user/${id}`,
      }),
      providesTags: ["user"],
    }),
    updatedUserById: builder.query({
      query: ({ id, data }) => ({
        url: `/users/get-one-user/${id}`,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["user"],
    }),
    updateUserProfile: builder.query({
      query: (data) => ({
        url: `/users/update-profile-by-user`,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["user"],
    }),
    signUpPatient: builder.mutation({
      query: (data) => ({
        url: `/users/auth/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    signUpDoctor: builder.mutation({
      query: (data) => ({
        url: `/users/auth/signup-as-doctor`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users/create-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/users/auth/verify-email`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `/users/auth/forgot-password?email=${email}`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: () => ({
        url: `/users/auth/reset-password`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: () => ({
        url: `/users/auth/change-password`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    approvedDoctor: builder.mutation({
      query: () => ({
        url: `/users/auth/approve-doctor`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    cancelDoctor: builder.mutation({
      query: () => ({
        url: `/users/auth/cancel-doctor`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/users/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    loginDoctor: builder.mutation({
      query: (data) => ({
        url: `/users/auth/login-as-doctor`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    loginOut: builder.mutation({
      query: () => ({
        url: `/users/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),

    sendCodeAgain: builder.mutation({
      query: (data) => ({
        url: `/auth/resend-email`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useCreateUserMutation,
  useSendCodeAgainMutation,
  useLoginMutation,
  useLoginDoctorMutation,
  useLoginOutMutation,
  useSignUpPatientMutation,
  useSignUpDoctorMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useApprovedDoctorMutation,
  useCancelDoctorMutation,
  useVerifyEmailMutation,
  useAllUserQuery,
  useAllPatientsQuery,
  useAllDoctorQuery,
  useGetUserByIdQuery,
  useUpdatedUserByIdQuery,
  useUpdateUserProfileQuery,
} = authSlice;
