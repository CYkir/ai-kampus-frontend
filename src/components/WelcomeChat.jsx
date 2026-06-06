import { Icon } from "@iconify/react";
import LogoUpri from "../assets/image/logo_unpri.png";

const WelcomeChat = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full text-gray-600">
      {/* Icon */}
      <div className="mb-2">
        {/* <Icon
          icon="hugeicons:chat-bot"
          width="64"
          height="64"
          style={{ color: "#f5ca0c" }}
        /> */}
        <img src={LogoUpri} alt="Logo Unpri" className="w-32" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2 font-lato">
        Selamat Datang di AI Kampus
      </h2>

      {/* Description */}
      <p className="text-sm font-lato max-w-md mb-6">
        Asisten cerdas Universitas Prima Indonesia yang siap membantu kamu dalam
        berbagai hal seputar akademik, perkuliahan, tugas, dan informasi kampus.
      </p>

      {/* Suggestion */}
      <div className="flex flex-col gap-2 text-sm items-center">
        <span className="text-gray-500 font lato">Coba tanyakan:</span>

        <div className="bg-white w-fit px-4 py-2 rounded-xl shadow cursor-pointer hover:bg-gray-100 font-lato">
          <p>jumlah prodi yang ada di fakultas Sains dan Teknologi</p>
        </div>

        <div className="bg-white w-fit px-4 py-2 rounded-xl shadow cursor-pointer hover:bg-gray-100">
          Kapan Pembayaran UKT
        </div>
      </div>
    </div>
  );
};

export default WelcomeChat;
