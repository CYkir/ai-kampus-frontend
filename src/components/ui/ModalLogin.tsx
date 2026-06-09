import { useState } from "react";
import { createPortal } from "react-dom";
import logoUnpri from '../../assets/image/logo_unpri.png'
export default function ModalLogin({ onClose }) {
  const [tab, setTab] = useState("mahasiswa");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isMahasiswa = tab === "mahasiswa";

  function handleSubmit(e) {
    e.preventDefault();

    if (!id.trim() || !password.trim()) {
      setError("Mohon lengkapi semua kolom.");
      return;
    }

    setError("");

    console.log("Login data:", {
      role: tab,
      id,
      password,
    });

    setId("");
    setPassword("");
    onClose();
  }

  function changeTab(role) {
    setTab(role);
    setId("");
    setPassword("");
    setError("");
  }

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#b8a7c8]/90 px-4 backdrop-blur-sm"
      style={{ zIndex: 999999 }}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative w-full max-w-[490px] rounded-[30px] border border-white/50 bg-white/55 px-7 pb-7 pt-7 shadow-xl backdrop-blur-2xl"
        style={{ zIndex: 1000000 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-[120px] w-[120px] items-center justify-center text-sm font-black text-black ">
            <img src={logoUnpri} alt="" />
          </div>

          <h2 className="mt-5 text-[22px] font-extrabold tracking-tight text-[#151127]">
            Masuk ke AI Kampus Assistant
          </h2>

          <p className="mt-2 text-[15px] text-[#6d6578]">
            Login untuk mengakses fitur personal akademik.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 rounded-[22px] bg-[#f1edf7]/80 p-1">
          <button
            type="button"
            onClick={() => changeTab("mahasiswa")}
            className={`rounded-[18px] py-3 text-[15px] font-semibold transition-all ${
              tab === "mahasiswa"
                ? "bg-white text-[#151127] shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
                : "text-[#6d6578]"
            }`}
          >
            Mahasiswa
          </button>

          <button
            type="button"
            onClick={() => changeTab("dosen")}
            className={`rounded-[18px] py-3 text-[15px] font-semibold transition-all ${
              tab === "dosen"
                ? "bg-white text-[#151127] shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
                : "text-[#6d6578]"
            }`}
          >
            Dosen
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#151127]">
              {isMahasiswa ? "NIM" : "NIDN"}
            </label>

            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={isMahasiswa ? "Masukkan NIM" : "Masukkan NIDN"}
              className="h-[45px] w-full rounded-full border border-white/60 bg-white px-5 text-[15px] text-[#151127] outline-none transition placeholder:text-[#9b96a3] focus:ring-2 focus:ring-[#4b006e]/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#151127]">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="h-[45px] w-full rounded-full border border-white/60 bg-white px-5 text-[15px] text-[#151127] outline-none transition placeholder:text-[#9b96a3] focus:ring-2 focus:ring-[#4b006e]/30"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            className="mt-2 h-[47px] w-full rounded-full bg-primary text-[15px] font-bold text-white shadow-[0_12px_25px_rgba(75,0,110,0.25)] transition hover:cursor-pointer hover:opacity-95"
          >
            Login sebagai {isMahasiswa ? "Mahasiswa" : "Dosen"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-[13px]">
          <button
            type="button"
            onClick={onClose}
            className="text-[#7b7285] transition hover:cursor-pointer hover:text-[#151127]"
          >
            ← Kembali
          </button>

          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-[#4b006e] transition hover:cursor-pointer hover:underline"
          >
            Lanjut tanpa login
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
