import { api } from "../api/baseApi";

export const notificationsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationByUserId: builder.query({
      query: () => ({
        url: `/users/notifications-by-user`,
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
