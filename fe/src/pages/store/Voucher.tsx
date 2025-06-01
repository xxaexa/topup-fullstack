import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, ContainerWrap, Input } from "../../components";

import { useGetVoucherByGameNameQuery } from "../../redux/api/voucher";
import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from "../../redux/api/transaction";
import lb from "./../../assets/banner/lb game.jpg";
import { toast } from "react-toastify";

const VoucherPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: voucher,
    isLoading,
    isError,
  } = useGetVoucherByGameNameQuery(id || "");
  console.log(voucher);
  const [createTransaction] = useCreateTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [buyerEmail, setBuyerEmail] = useState("");

  const selectedPrice =
    selectedVariant !== null ? voucher?.variants[selectedVariant].price : 0;
  const selectedVariantData =
    selectedVariant !== null ? voucher?.variants[selectedVariant] : null;

  useEffect(() => {
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const script = document.createElement("script");
    const midtransKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    script.setAttribute("data-client-key", midtransKey);
    script.src = snapSrcUrl;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    setFormErrors((prev) => ({ ...prev, [fieldName]: false }));
  };

  const handleSubmit = async () => {
    if (!voucher || selectedVariant === null) return;

    const newErrors: Record<string, boolean> = {};
    let hasEmptyFields = false;

    voucher.input_fields.forEach((input: any) => {
      if (input.required && !formValues[input.field_name]?.trim()) {
        newErrors[input.field_name] = true;
        hasEmptyFields = true;
      }
    });

    if (!buyerEmail.trim()) {
      newErrors["buyerEmail"] = true;
      hasEmptyFields = true;
      toast.error("Email wajib diisi");
    } else {
      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(buyerEmail)) {
        newErrors["buyerEmail"] = true;
        toast.error("Format email tidak valid");
        setFormErrors(newErrors);
        return;
      }
    }

    if (hasEmptyFields) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      setFormErrors(newErrors);
      return;
    }

    const payload = {
      buyer_email: buyerEmail,
      voucher_id: voucher._id,
      voucher_name: voucher.game_name,
      variant: selectedVariantData,
      buyer_inputs: formValues,
    };

    try {
      const response = await createTransaction(payload).unwrap();
      const { midtransToken, transactionId } = response.data;

      window.snap.pay(midtransToken, {
        onSuccess: async () => {
          try {
            toast.error("Pembayaran Berhasil");
          } catch (error) {
            toast.error("Gagal update status transaksi");
          }
        },
        onPending: () => toast.warning("Transaksi pending"),
        onError: async () => {
          try {
            await updateTransaction({
              id: transactionId,
              data: { payment_status: "failed" },
            });
          } catch (error) {
            console.error("Gagal update status saat error:", error);
          }
          toast.error("Terjadi kesalahan pembayaran");
        },
        onClose: async () => {
          try {
            await updateTransaction({
              id: transactionId,
              data: { payment_status: "failed" },
            });
          } catch (error) {
            console.error("Gagal update status saat close:", error);
          }
          toast.error("Pembayaran dibatalkan");
        },
      });
    } catch (err) {
      console.error("Gagal membuat transaksi:", err);
      toast.error("Gagal membuat transaksi");
    }
  };

  return (
    <div>
      {isLoading && <p className="text-center mt-10">Memuat data voucher...</p>}
      {isError && (
        <p className="text-center mt-10 text-red-500">Gagal memuat data.</p>
      )}
      {!voucher ? null : (
        <>
          <img src={lb} alt="long-banner" />
          <ContainerWrap className="mt-12">
            <Box className="relative pt-16 text-center">
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2">
                <img
                  src={voucher.image_url}
                  alt={voucher.game_name}
                  className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-md"
                />
              </div>
              <h2 className="text-xl font-bold mt-2">{voucher.game_name}</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {voucher.description}
              </p>
            </Box>

            {voucher.input_fields.map((field: any) => (
              <Box key={field.field_name} className="shadow rounded-xl p-4">
                <Input
                  label={field.label}
                  type="text"
                  placeholder={`Masukkan ${field.label}`}
                  className={`w-full p-2 border rounded-md ${
                    formErrors[field.field_name]
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 dark:bg-gray-700 dark:border-gray-600`}
                  required={field.required}
                  value={formValues[field.field_name] || ""}
                  onChange={(e) =>
                    handleChange(field.field_name, e.target.value)
                  }
                />
              </Box>
            ))}

            <Box className="shadow rounded-xl p-4">
              <Input
                label="Email"
                type="email"
                placeholder="Masukkan email kamu"
                className={`w-full p-2 border rounded-md ${
                  formErrors.buyerEmail ? "border-red-500" : "border-gray-300"
                } bg-gray-50 dark:bg-gray-700 dark:border-gray-600`}
                value={buyerEmail}
                onChange={(e) => {
                  setBuyerEmail(e.target.value);
                  setFormErrors((prev) => ({ ...prev, buyerEmail: false }));
                }}
              />
            </Box>

            <Box className=" shadow rounded-xl p-4">
              <label className="block font-medium mb-2">Pilih Variasi</label>
              <div className="grid md:grid-cols-3 gap-4">
                {voucher.variants.map((variant: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`px-4 py-2 rounded-lg border cursor-pointer ${
                      selectedVariant === index
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </Box>

            <Box className=" shadow rounded-xl p-4 flex items-center justify-between">
              <div className="text-lg font-semibold">
                Rp{selectedPrice.toLocaleString()}
              </div>
              <button
                onClick={handleSubmit}
                className={`px-6 py-2 rounded-lg text-white cursor-pointer ${
                  selectedVariant === null
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={selectedVariant === null}
              >
                Beli Sekarang
              </button>
            </Box>
          </ContainerWrap>
        </>
      )}
    </div>
  );
};

export default VoucherPage;
