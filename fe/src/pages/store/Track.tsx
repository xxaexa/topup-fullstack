import { useState, useEffect } from "react";
import { Box, ContainerWrap } from "../../components";
import { useGetTransactionByIdQuery } from "../../redux/api/transaction";

const Track = () => {
  const [transactionId, setTransactionId] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  const { data, isFetching, isError, isSuccess } = useGetTransactionByIdQuery(
    submittedId!,
    {
      skip: !submittedId,
    }
  );

  const transaction = data?.data;

  useEffect(() => {
    if (isFetching) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(true);
    }
  }, [isFetching]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContent(false);
    if (transactionId.trim()) {
      setSubmittedId(transactionId.trim());
    }
  };

  return (
    <ContainerWrap>
      <Box className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 my-12">
        <form onSubmit={handleSubmit} className="mb-6">
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

        {!showContent ? (
          <p className="py-12">Sedang memuat data transaksi...</p>
        ) : isError ? (
          <p className="text-red-500 py-12">Transaksi tidak ditemukan.</p>
        ) : isSuccess && transaction ? (
          <div className="py-12">
            <h2 className="text-lg font-bold mb-4">Detail Transaksi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>ID Transaksi:</strong>
                <p>{transaction.transaction_id}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Nama Voucher:</strong>
                <p>{transaction.voucher_name}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Email:</strong>
                <p>{transaction.buyer_email}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Status Pembayaran:</strong>
                <p>{transaction.payment_status}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Status Pengiriman:</strong>
                <p>{transaction.delivery_status}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Metode Pembayaran:</strong>
                <p>{transaction.payment_method}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Dibuat:</strong>
                <p>{new Date(transaction.createdAt).toLocaleString()}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Update Terakhir:</strong>
                <p>{new Date(transaction.updatedAt).toLocaleString()}</p>
              </div>

              {transaction.variant && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg col-span-2">
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

              {transaction.buyer_inputs && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg col-span-2">
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

export default Track;
