import { useState } from "react";
import { Box, ContainerWrap } from "../../components";
import { useGetTransactionByIdQuery } from "../../redux/api/transaction";

const Track = () => {
  const [transactionId, setTransactionId] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const { data, isFetching, isError, isSuccess } = useGetTransactionByIdQuery(
    submittedId!,
    {
      skip: !submittedId,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionId.trim()) {
      setSubmittedId(transactionId.trim());
    }
  };

  const transaction = data?.data;

  return (
    <ContainerWrap>
      <Box className="bg-gray-800 shadow rounded-xl p-4">
        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-1">ID Transaksi</label>
          <input
            type="text"
            placeholder="Masukkan ID transaksi"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Lacak Transaksi
          </button>
        </form>

        {isFetching && <p className="py-12">Sedang memuat data transaksi...</p>}
        {isError && (
          <p className="text-red-500 py-12">Transaksi tidak ditemukan.</p>
        )}
        {isSuccess && transaction && (
          <div className="py-12">
            <h2 className="text-lg font-bold mb-2">Detail Transaksi</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <strong>Nama Voucher:</strong> {transaction.voucher_name}
              </li>
              <li>
                <strong>Pembeli:</strong> {transaction.buyer_name}
              </li>
              <li>
                <strong>Email:</strong> {transaction.buyer_email}
              </li>
              <li>
                <strong>Input:</strong> Riot ID -{" "}
                {transaction.buyer_inputs.riot_id}
              </li>
              <li>
                <strong>Paket:</strong> {transaction.variant.name} (Rp
                {transaction.variant.price.toLocaleString()})
              </li>
              <li>
                <strong>Status Pembayaran:</strong> {transaction.payment_status}
              </li>
              <li>
                <strong>Status Pengiriman:</strong>{" "}
                {transaction.delivery_status}
              </li>
              <li>
                <strong>Dibuat:</strong>{" "}
                {new Date(transaction.createdAt).toLocaleString()}
              </li>
              <li>
                <strong>Update Terakhir:</strong>{" "}
                {new Date(transaction.updatedAt).toLocaleString()}
              </li>
            </ul>
          </div>
        )}
      </Box>
    </ContainerWrap>
  );
};

export default Track;
