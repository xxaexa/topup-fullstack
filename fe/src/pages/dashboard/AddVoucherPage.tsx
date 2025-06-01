import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Box from "../../components/Box";
import { useCreateVoucherMutation } from "../../redux/api/voucher";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowRoundBack, IoMdSave } from "react-icons/io";

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

const INPUT_TYPE_PRESETS: Record<string, InputField[]> = {
  id: [{ field_name: "user_id", label: "User ID", required: true }],
  id_server: [
    { field_name: "user_id", label: "User ID", required: true },
    { field_name: "server", label: "Server", required: true },
  ],
};

const AddVoucherPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard/voucher/");
  };

  const [form, setForm] = useState<CreateVoucherRequest>({
    game_name: "",
    voucher_name: "",
    image_url: "",
    description: "",
    input_fields: [
      {
        field_name: "user_id",
        label: "User ID",
        required: true,
      },
    ],
    variants: [],
  });
  const [createVoucher, { isLoading }] = useCreateVoucherMutation();

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
      await createVoucher(form).unwrap();
      toast.success("Berhasil menambah voucher");
      navigate("/dashboard/voucher/");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambah voucher");
    }
  };

  return (
    <div className="p-4 space-y-6 mb-12 md:mb-0">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center ">
          <Button
            text={"Kembali"}
            onClick={handleNavigate}
            type={"button"}
            icon={<IoIosArrowRoundBack />}
          />
          <h3 className="text-lg font-semibold text-white w-full">
            TAMBAH VOUCHER
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

      <Box className="">
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
          className="p-2 mb-2 w-full  border-b-2"
        />
        <Input
          label="Image URL"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="https://image.com/voucher.jpg"
          className="p-2 mb-2 w-full  border-b-2"
        />
        <Input
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi voucher"
          className="p-2  mb-2 w-full  border-b-2"
        />
      </Box>
      <Box>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-text-dark">
            Tipe Input
          </label>
          <select
            onChange={(e) => {
              const selected = e.target.value;
              const presetFields = INPUT_TYPE_PRESETS[selected] || [];
              setForm((prev) => ({
                ...prev,
                input_fields: presetFields,
              }));
            }}
            className="w-full border-b-2  outline-none bg-accent-dark border-gray-600 text-white py-2"
          >
            <option value="id">User ID</option>
            <option value="id_server">User ID + Server</option>
          </select>
        </div>
      </Box>

      <Box>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-text0-dark">Variasi</h3>
          <button
            type="button"
            onClick={handleAddVariant}
            className="text-sm bg-primary hover:bg-secondary text-text px-3 py-3 rounded cursor-pointer"
          >
            + Tambah Variasi
          </button>
        </div>
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
          text={isLoading ? "Menyimpan" : "Simpan"}
          type="button"
          onClick={handleSubmit}
          className="w-full"
          icon={<IoMdSave />}
        />
      </div>
    </div>
  );
};

export default AddVoucherPage;
