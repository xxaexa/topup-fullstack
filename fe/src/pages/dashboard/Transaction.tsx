import { useState } from "react";
import Table from "../../components/Table";
import {
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
} from "../../redux/api/transaction";
import { Input, Button } from "../../components";
import { toast } from "react-toastify";

export interface Variant {
  name: string;
  price: number;
}

export interface BuyerInputs {
  [key: string]: string;
}

export interface Transaction {
  _id: string;
  buyer_name: string;
  buyer_email: string;
  voucher_id: string;
  voucher_name: string;
  buyer_inputs: BuyerInputs;
  payment_status: string;
  delivery_status: string;
  variant: Variant;
  transaction_id: Variant;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionResponse {
  status: string;
  data: Transaction[];
}

const TransactionPage = () => {
  const { data = [], isLoading } = useGetTransactionsQuery();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState("pending");

  const filtered = data
    .filter((t) => t._id.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortAsc ? a._id.localeCompare(b._id) : b._id.localeCompare(a._id)
    );

  const perPage = 10;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleUpdate = async () => {
    if (!selected) return;

    try {
      await updateTransaction({
        _id: selected._id,
        delivery_status: deliveryStatus,
        buyer_email: selected.buyer_email,
      });

      toast.success("Status transaksi berhasil diperbarui");
      setSelected(null);
    } catch (error: any) {
      toast.error(
        error?.message || "Terjadi kesalahan saat memperbarui transaksi"
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <Input
          type="text"
          placeholder="Cari berdasarkan ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full md:w-auto border-b-2 border-blue-500 bg-gray-800 text-white focus:outline-none  focus:ring-blue-300 "
        />
        <Button
          onClick={() => setSortAsc((prev) => !prev)}
          text={sortAsc ? "Sort Z-A" : "Sort A-Z"}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-text rounded-lg shadow w-32"
          type="button"
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
          <Table
            headers={[
              "ID",
              "Email",
              "Status Pembayaran",
              "Status pengiriman",
              "Aksi",
            ]}
            data={paginated.map((t) => [
              <span className="text-sm font-mono text-text-dark">{t._id}</span>,
              <span className="font-medium text-text-dark">
                {t.buyer_email}
              </span>,
              <div className="text-xs">
                <p className="text-text-dark">{t.payment_status}</p>
              </div>,
              <div className="text-xs">
                <p className="text-text-dark">{t.delivery_status}</p>
              </div>,
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setSelected(t);
                    setDeliveryStatus(t.delivery_status);
                  }}
                  className="px-3 py-1 cursor-pointer bg-accent hover:bg-blue-300 text-text rounded shadow text-sm"
                >
                  Update
                </button>
              </div>,
            ])}
          />
        </div>
      )}

      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm cursor-pointer ${
              page === i + 1
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Update Transaksi
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p>
                <strong>Voucher:</strong> {selected.voucher_name}
              </p>
              <p>
                <strong>Variant:</strong> {selected.variant.name} - Rp{" "}
                {selected.variant.price.toLocaleString()}
              </p>
              <div>
                <strong>Buyer Inputs:</strong>
                <ul className="list-disc list-inside ml-2">
                  {Object.entries(selected.buyer_inputs).map(([key, val]) => (
                    <li key={key}>
                      {key}: {val}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label htmlFor="status" className="block mb-1">
                  Delivery Status:
                </label>
                <select
                  id="status"
                  value={deliveryStatus}
                  onChange={(e) => setDeliveryStatus(e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setSelected(null)}
                className="cursor-pointer px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
