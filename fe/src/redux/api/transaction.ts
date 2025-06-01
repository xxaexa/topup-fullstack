import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import {
  Transaction,
  TransactionResponse,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  CreateTransactionResponse
} from "../../types/index";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: customFetchBase,
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => ({
        url: "/transaction",
      }),
      transformResponse: (response: TransactionResponse) => response.data,
      providesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    getTransactionById: builder.query<Transaction, string>({
      query: (id) => ({
        url: `/transaction/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Transaction", id }],
    }),

    createTransaction: builder.mutation<CreateTransactionResponse, CreateTransactionRequest>({
      query: (body) => ({
        url: "/transaction/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
     
    }),

    updateTransaction: builder.mutation<unknown, UpdateTransactionRequest>({
      query: ({ _id, ...body }) => ({
        url: `/transaction/${_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Transaction", id: _id },
        { type: "Transaction", id: "LIST" },
      ],
    }),

    updateTransactionStatus: builder.mutation<any, string>({
      query: (id) => ({
        url: `/transaction/update-status/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useUpdateTransactionStatusMutation,
} = transactionApi;
