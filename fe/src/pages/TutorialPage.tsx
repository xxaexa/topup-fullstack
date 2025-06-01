import { Box } from "../components";
import { useNavigate } from "react-router-dom";

import React from "react";
const TutorialPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300 cursor-pointer"
        aria-label="Kembali ke Home"
      >
        Home
      </button>
      {/* 1. Tentang Website */}
      <Box className="text-text-dark ">
        <section>
          <h1 className="text-3xl font-bold ">Tutorial Page</h1>
        </section>
      </Box>

      <Box className="text-text-dark my-6">
        <section>
          <h1 className="text-3xl font-bold mb-4">Apa Itu Website Ini?</h1>
          <p className="">
            Website ini menyediakan layanan top-up voucher game dan produk
            digital secara cepat, aman, dan tanpa perlu membuat akun. Pembayaran
            dilakukan melalui sistem aman dari <strong>Midtrans</strong>.
          </p>
        </section>
      </Box>

      {/* 2. Cara Melakukan Top-Up */}
      <Box className="text-text-dark my-6 ">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Cara Melakukan Top-Up</h2>
          <ol className="list-decimal list-inside  space-y-2">
            <li>Pilih game atau produk digital yang ingin Anda top-up.</li>
            <li>
              Masukkan ID game atau nomor tujuan (misal: ID ML, UID FF, dll).
            </li>
            <li>Pilih nominal/top-up yang tersedia.</li>
            <li>Isi data kontak Anda (email atau nomor WhatsApp).</li>
            <li>Pilih metode pembayaran yang diinginkan.</li>
            <li>Akan diarahkan ke halaman pembayaran Midtrans.</li>
            <li>Lakukan pembayaran sesuai instruksi.</li>
            <li>Transaksi akan diproses otomatis dalam beberapa menit.</li>
          </ol>
        </section>
      </Box>

      {/* 3. Cara Bayar via Midtrans */}
      <Box className="text-text-dark my-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Cara Bayar via Midtrans
          </h2>
          <p className=" mb-2">
            Midtrans akan mengarahkan Anda ke halaman pembayaran sesuai metode
            yang dipilih, seperti:
          </p>
          <ul className="list-disc list-inside  space-y-1">
            <li>QRIS</li>
            <li>Transfer Bank (BCA, Mandiri, BNI, dll)</li>
            <li>e-Wallet (GoPay, OVO, DANA, ShopeePay)</li>
          </ul>
          <p className=" mt-2">
            Setelah Anda membayar, sistem kami akan langsung memproses top-up
            secara otomatis.
          </p>
        </section>
      </Box>
      {/* 4. Cara Lacak Transaksi */}
      <Box className="text-text-dark my-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Cara Melacak Transaksi Anda
          </h2>
          <ol className="list-decimal list-inside  space-y-2">
            <li>
              Buka halaman <strong>Lacak Transaksi</strong> dari menu utama.
            </li>
            <li>
              Masukkan <strong>Nomor Transaksi</strong> atau{" "}
              <strong>Email/No WA</strong> yang Anda gunakan saat transaksi.
            </li>
            <li>Klik tombol "Lacak".</li>
            <li>
              Anda akan melihat status: <em>Diproses / Berhasil / Gagal</em>.
            </li>
          </ol>
        </section>
      </Box>
      {/* 5. FAQ */}
      <Box className="text-text-dark my-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Pertanyaan Umum (FAQ)</h2>
          <div className="space-y-4 ">
            <div>
              <strong>❓ Apakah ini aman?</strong>
              <p>
                Ya, semua pembayaran diproses melalui Midtrans dan tidak
                menyimpan data kartu Anda.
              </p>
            </div>
            <div>
              <strong>❓ Bagaimana jika saya salah input ID?</strong>
              <p>
                Kesalahan input menjadi tanggung jawab pembeli. Pastikan data
                sudah benar sebelum membayar.
              </p>
            </div>
            <div>
              <strong>❓ Bisa refund atau batalkan transaksi?</strong>
              <p>
                Refund hanya bisa dilakukan jika sistem belum memproses top-up.
                Hubungi admin secepatnya.
              </p>
            </div>
            <div>
              <strong>❓ Berapa lama proses top-up?</strong>
              <p>
                Top-up biasanya selesai dalam waktu 1–5 menit setelah
                pembayaran.
              </p>
            </div>
          </div>
        </section>
      </Box>
      {/* 6. Panduan Admin */}
      <Box className="text-text-dark mt-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Tutorial untuk Admin</h2>
          <ol className="list-decimal list-inside  space-y-2">
            <li>
              Login ke halaman <strong>Dashboard Admin</strong>.
            </li>
            <li>Lihat daftar transaksi masuk dan statusnya.</li>
            <li>
              Jika transaksi belum diproses otomatis, lakukan top-up manual.
            </li>
            <li>Update status transaksi secara manual jika diperlukan.</li>
            <li>Kelola data produk, harga, dan voucher melalui menu Produk.</li>
            <li>Cek laporan penjualan pada menu Laporan.</li>
          </ol>
        </section>
      </Box>
    </div>
  );
};

export default TutorialPage;
