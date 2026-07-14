import {
  Sparkles,
  GraduationCap,
  BookOpen,
  Calendar,
  FileCheck2,
  Phone,
  Building2,
} from "lucide-react";

import PromptSuggestionCard from "./PromptSuggestionCard";
import Robot from "../../assets/image/robot.gif";

const SUGGESTIONS = [
  { icon: GraduationCap, title: "Apa saja program studi di UNPRI?" },
  { icon: BookOpen, title: "Bagaimana cara mengakses SPADA?" },
  { icon: Calendar, title: "Tampilkan informasi kalender akademik" },
  { icon: FileCheck2, title: "Bagaimana cara mengisi KRS?" },
  { icon: Phone, title: "Kontak layanan kampus" },
  { icon: Building2, title: "Informasi fakultas" },
];

const WelcomeChatState = ({ onPick }) => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-8 md:py-14">
      <div className="relative">
        <div className="absolute inset-0 brand-gradient blur-2xl opacity-50 rounded-full" />

        <div>
          <img
            src={Robot}
            alt=""
            className="h-40 w-40 md:h-52 md:w-52 object-contain"
          />
        </div>
      </div>

      <h1
        className="mt-3
                  text-center
                  text-3xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  sm:text-4xl"
      >
        Selamat datang di{" "}
        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          AI Kampus Assistant
        </span>
      </h1>

      <p className="mt-3 max-w-xl text-center text-sm text-gray-500">
        Tanyakan informasi kampus, akademik, SPADA, SIAM, program studi, jadwal,
        atau layanan UNPRI lainnya.
      </p>

      <div
        className="mt-8
                  grid
                  w-full
                  max-w-4xl
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  lg:grid-cols-3"
      >
        {SUGGESTIONS.map((item) => (
          <PromptSuggestionCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            // onClick={() => onPick(item.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeChatState;
