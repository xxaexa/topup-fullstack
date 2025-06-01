import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Box from "../../components/Box";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowRoundBack, IoMdSave } from "react-icons/io";
import {
  useGetVoucherByIdQuery,
  useUpdateVoucherMutation,
} from "../../redux/api/voucher";

interface Variant {
  name: string;
  price: number;
}

interface InputField {
  field_name: string;
  label: string;
  required: boolean;
}

export interface CreateVoucherRequest {
  game_name: string;
  voucher_name: string;
  image_url: string;
  description: string;
  input_fields: InputField[];
  variants: Variant[];
}

const UpdateVoucherPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: voucher,
    isLoading: loadingVoucher,
    error,
  } = useGetVoucherByIdQuery(id ?? "");
  const [updateVoucher, { isLoading }] = useUpdateVoucherMutation();

  const [form, setForm] = useState<CreateVoucherRequest>({
    game_name: "",
    voucher_name: "",
    image_url: "",
    description: "",
    input_fields: [],
    variants: [],
  });

  useEffect(() => {
    if (voucher) {
      const {
        game_name,
        voucher_name,
        image_url,
        description,
        input_fields,
        variants,
      } = voucher;
      setForm({
        game_name,
        voucher_name,
        image_url,
        description,
        input_fields,
        variants,
      });
    }
  }, [voucher]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { name: "", price: 0 }],
    }));
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = form.variants.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, variants: newVariants }));
  };

  const handleVariantChange = (
    index: number,
    key: keyof Variant,
    value: string
  ) => {
    const updated = [...form.variants];
    updated[index][key] = key === "price" ? Number(value) : value;
    setForm((prev) => ({ ...prev, variants: updated }));
  };

  const handleSubmit = async () => {
    try {
      if (!id) return;

      await updateVoucher({ id, ...form }).unwrap();
      toast.success("Berhasil memperbarui voucher");
      navigate("/dashboard/voucher/");
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui voucher");
    }
  };

  const handleNavigate = () => {
    navigate("/dashboard/voucher/");
  };

  if (loadingVoucher) return <div className="text-white">Memuat data...</div>;
  if (error)
    return <div className="text-red-500">Gagal mengambil data voucher.</div>;

  return (
    <div className="p-4 space-y-6 mb-12 md:mb-0">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center ">
          <Button
            text="Kembali"
            onClick={handleNavigate}
            type="button"
            icon={<IoIosArrowRoundBack />}
          />
          <h3 className="text-lg font-semibold text-white w-full">
            EDIT VOUCHER
          </h3>
        </div>
        <div className="hidden md:flex">
          <Button
            text={isLoading ? "Menyimpan..." : "Simpan"}
            type="button"
            onClick={handleSubmit}
            className="w-full"
            icon={<IoMdSave />}
          />
        </div>
      </div>

      <Box>
        <Input
          label="Game Name"
          name="game_name"
          value={form.game_name}
          onChange={handleChange}
          placeholder="Masukkan nama game"
          className="p-2 mb-2 w-full border-b-2 text-text"
        />
        <Input
          label="Voucher Name"
          name="voucher_name"
          value={form.voucher_name}
          onChange={handleChange}
          placeholder="Masukkan nama voucher"
          className="p-2 mb-2 w-full border-b-2"
        />
        <Input
          label="Image URL"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="https://image.com/voucher.jpg"
          className="p-2 mb-2 w-full border-b-2"
        />
        <Input
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi voucher"
          className="p-2 mb-2 w-full border-b-2"
        />
      </Box>

      <Box>
        <h3 className="text-lg font-semibold text-text0-dark mb-2">Variasi</h3>
        <button
          type="button"
          onClick={handleAddVariant}
          className="text-sm bg-primary hover:bg-secondary text-text px-3 py-3 rounded mb-4"
        >
          + Tambah Variasi
        </button>
        {form.variants.map((variant, idx) => (
          <div key={idx} className="flex gap-2 items-end mb-3">
            <Input
              label="Name"
              value={variant.name}
              onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
            />
            <Input
              label="Price"
              type="number"
              value={variant.price.toString()}
              onChange={(e) =>
                handleVariantChange(idx, "price", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => handleRemoveVariant(idx)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 h-9"
            >
              Hapus
            </button>
          </div>
        ))}
      </Box>

      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-accent-dark dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 shadow-md">
        <Button
          text={isLoading ? "Menyimpan..." : "Simpan"}
          type="button"
          onClick={handleSubmit}
          className="w-full"
          icon={<IoMdSave />}
        />
      </div>
    </div>
  );
};

export default UpdateVoucherPage;
