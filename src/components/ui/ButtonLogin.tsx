import { LogIn } from 'lucide-react';
import React, { useState } from 'react'
import ModalLogin from './ModalLogin';
export default function ButtonLogin({
  text = "login",
  bgColor = "bg-primary",
  borderColor = "border-gold/50",
  border = "border",
  textColor = "text-gold",
  hoverBg = "bg-gold/20",
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={`flex w-full items-center justify-center gap-2 rounded-xl ${bgColor} ${border} ${borderColor}  bg-gold/10 px-3 py-2.5 text-sm font-semibold ${textColor} hover:${hoverBg} transition-colors hover:cursor-pointer`}
      >
        <LogIn className="h-4 w-4" /> {text}
      </button>
      {openModal && <ModalLogin onClose={() => setOpenModal(false)} />}
    </>
  );
}
