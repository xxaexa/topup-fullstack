import { useState } from "react";
import {
  useGetVouchersQuery,
  useDeleteVoucherMutation,
} from "../../redux/api/voucher";
import { Table, Button, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";

export interface InputField {
  field_name: string;
  label: string;
  required: boolean;
}

export interface Variant {
  name: string;
  price: number;
}

export interface Voucher {
  _id: string;
  game_name: string;
  voucher_name: string;
  image_url: string;
  description: string;
  input_fields: InputField[];
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
}

export interface VoucherResponse {
  status: string;
  data: Voucher[];
}

const VoucherPage = () => {
  const { data = [], isLoading } = useGetVouchersQuery();
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  console.log(data);
  const [deleteVoucher] = useDeleteVoucherMutation();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus voucher ini?");
    if (confirmDelete) {
      try {
        await deleteVoucher(id).unwrap();
        toast.success("Voucher berhasil dihapus!");
      } catch (error) {
        console.log(error);
        toast.error("Gagal menghapus voucher!");
      }
    }
  };

  const filtered = data
    .filter((v) => v.game_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortAsc
        ? a.game_name.localeCompare(b.game_name)
        : b.game_name.localeCompare(a.game_name)
    );

  const perPage = 10;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleNavigate = () => {
    navigate("add");
  };

  const handleUpdate = (name: string) => {
    navigate(`/dashboard/voucher/update/${name}`);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-1/2">
          <Input
            type="text"
            placeholder="Cari game..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 w-full md:w-auto border-b-2 border-blue-500 bg-gray-800 text-white focus:outline-none  focus:ring-blue-300 "
          />
          <Button
            text={sortAsc ? "Sort Z-A" : "Sort A-Z"}
            onClick={() => setSortAsc((prev) => !prev)}
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:text-black rounded-lg shadow w-full "
          />
        </div>
        <div className="hidden md:flex ">
          <Button
            className="px-12 py-2 bg-blue-600 hover:bg-blue-700 text-text rounded-lg shadow w-full "
            text={"Tambah\u00A0Voucher"}
            onClick={handleNavigate}
            type="button"
            icon={<IoIosAdd />}
          />
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
          <Table
            headers={["Gambar", "Nama Game", "Aksi"]}
            data={paginated.map((v) => [
              <img
                src={v.image_url}
                alt={v.game_name}
                className="w-12 h-12 rounded shadow"
              />,
              <span className="font-medium text-text-dark">{v.game_name}</span>,
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdate(v._id)}
                  className="cursor-pointer px-3 py-1 bg-primary hover:bg-secondary text-text  rounded shadow text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(v._id)}
                  className="cursor-pointer px-3 py-1 bg-primary hover:bg-secondary text-text  rounded shadow text-sm"
                >
                  Delete
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
            className={`px-3 py-1 rounded-full text-sm transition-all duration-200 shadow-sm cursor-pointer  ${
              page === i + 1
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 shadow-md ">
        <Button
          text={"Tambah Voucher"}
          onClick={handleNavigate}
          type={"button"}
          className="w-full mx-2"
          icon={<IoIosAdd />}
        />
      </div>
    </div>
  );
};

export default VoucherPage;
