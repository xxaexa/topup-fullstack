import { useParams } from "react-router-dom";
import {
  useGetTransactionByIdQuery,
  useUpdateTransactionStatusMutation,
} from "../../redux/api/transaction";
import { Box, ContainerWrap } from "../../components";
import { useEffect } from "react";
import { toast } from "react-toastify";

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, isSuccess, refetch } =
    useGetTransactionByIdQuery(id!, {
      skip: !id,
    });

  const transaction = data?.data;

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTransactionStatusMutation();

  useEffect(() => {
    const updateTransaction = async () => {
      try {
        await new Promise((res) => setTimeout(res, 3000));
        if (id) {
          await updateStatus(id).unwrap();
          toast.success("Status transaksi diperbarui!");
          refetch();
        }
      } catch (err: any) {
        toast.error("Gagal memperbarui status transaksi");
        console.error(err);
      }
    };

    updateTransaction();
  }, [id, updateStatus, refetch]);

  return (
    <ContainerWrap>
      <Box className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 my-12">
        {isUpdating && (
          <p className="mb-4 text-blue-600 font-semibold">
            Memperbarui status transaksi...
          </p>
        )}

        {isLoading ? (
          <p>Sedang memuat detail transaksi...</p>
        ) : isError ? (
          <p className="text-red-500">Transaksi tidak ditemukan.</p>
        ) : isSuccess && transaction ? (
          <div>
            <h2 className="text-xl font-bold mb-6">Detail Transaksi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>ID Transaksi:</strong>
                <p>{transaction.transaction_id}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Email:</strong>
                <p>{transaction.buyer_email}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Nama Voucher:</strong>
                <p>{transaction.voucher_name}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Status Pembayaran:</strong>
                <p>{transaction.payment_status}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Status Pengiriman:</strong>
                <p>{transaction.delivery_status}</p>
              </div>

              {/* Variant */}
              {transaction.variant && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <strong>Variasi:</strong>
                  <div className="mt-1">
                    {Object.entries(transaction.variant).map(
                      ([key, value], idx) => (
                        <p key={idx}>
                          {key}: <span className="font-medium">{value}</span>
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Buyer Inputs */}
              {transaction.buyer_inputs && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <strong>Input Pembeli:</strong>
                  <div className="mt-1">
                    {Object.entries(transaction.buyer_inputs).map(
                      ([key, value], idx) => (
                        <p key={idx}>
                          {key}: <span className="font-medium">{value}</span>
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Box>
    </ContainerWrap>
  );
};

export default TransactionDetail;
