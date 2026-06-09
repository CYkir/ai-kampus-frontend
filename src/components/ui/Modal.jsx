import { useState } from "react";
import { LogIn } from "lucide-react";
import LoginModal from "./LoginModal";


export default function ButtonLogin({ text = "Login" }) {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenLogin(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/50 bg-gold/10 px-3 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20 transition-colors hover:cursor-pointer"
      >
        <LogIn className="h-4 w-4" />
        {text}
      </button>

      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
}
