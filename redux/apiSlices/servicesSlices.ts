import { api } from "../api/baseApi";

export const servicesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: ({ id, page, limit }) => ({
        url: `/service/get-all-services`,
      }),
      providesTags: ["services"],
    }),
    getServiceById: builder.query({
      query: (id) => ({
        url: `/service/get-service-by-id/${id}`,
      }),
      providesTags: ["services"],
    }),
    updateServiceById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/get-service-by-id/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    deletedService: builder.mutation({
      query: (id) => ({
        url: `/service/get-service-by-id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: `/service/add-service`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),

    disableService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/disable-service-by-id/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    enableService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/enable-service-by-id/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    approvedService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/approve-service-by-id/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    cancelServices: builder.mutation({
      query: ({ id, data }) => ({
        url: `service/cancel-service-by-id/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useApprovedServiceMutation,
  useCancelServicesMutation,
  useDisableServiceMutation,
  useEnableServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useUpdateServiceByIdMutation,
  useDeletedServiceMutation,
} = servicesSlices;
