import { api } from "../api/baseApi";

export const notificationsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationByUserId: builder.query({
      query: (id) => ({
        url: `/notification/get-notifications-by-user/${id}`,
      }),
      providesTags: ["notifications"],
    }),
    getAllNotifications: builder.query({
      query: () => ({
        url: `/users/all-notifications`,
      }),
      providesTags: ["notifications"],
    }),
  }),
});

export const { useGetAllNotificationsQuery, useGetNotificationByUserIdQuery } =
  notificationsSlices;
