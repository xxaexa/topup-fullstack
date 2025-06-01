import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import {
  Voucher,
  VoucherResponse,
  CreateVoucherRequest,
} from "../../types/index";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: customFetchBase,
  tagTypes: ["Voucher"],
  endpoints: (builder) => ({
    getVouchers: builder.query<Voucher[], void>({
      query: () => ({
        url: "/voucher/",
      }),
      transformResponse: (response: VoucherResponse) => response.data,
      providesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    getVoucherById: builder.query<Voucher, string>({
      query: (id) => ({
        url: `/voucher/${id}`,
      }),
      transformResponse: (response: { data: Voucher[] }) => response.data[0],
      providesTags: (result, error, id) => [{ type: "Voucher", id }],
    }),

    getVoucherByGameName: builder.query<Voucher, string>({
      query: (gameName) => ({
        url: `/voucher/game/${gameName}`,
      }),
      transformResponse: (response: { data: Voucher[] }) => response.data[0], // Ambil 1 voucher jika banyak
      providesTags: (result, error, gameName) => [{ type: "Voucher", id: gameName }],
    }),

    createVoucher: builder.mutation<unknown, CreateVoucherRequest>({
      query: (body) => ({
        url: "/voucher",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Voucher[] }) => response.data[0],
      invalidatesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    updateVoucher: builder.mutation<unknown, UpdateVoucherRequest>({
      query: ({ id, ...body }) => ({
        url: `/voucher/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Voucher", id: _id },
        { type: "Voucher", id: "LIST" },
      ],
    }),

    deleteVoucher: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/voucher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Voucher"],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useGetVoucherByIdQuery,
  useCreateVoucherMutation,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
  useGetVoucherByGameNameQuery,
  
} = voucherApi;
