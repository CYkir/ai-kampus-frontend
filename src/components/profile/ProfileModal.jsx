import {
  LogOut,
  Mail,
  GraduationCap,
  Building2,
  BookOpen,
  Hash,
  CalendarDays,
  UserRound,
} from "lucide-react";

import Modal from "../ui/Modal";
import { logout } from "../../api/authApi";

export default function ProfileModal({
  open,
  onClose,
  profile,
  role,
  onLogout,
}) {
  if (!profile) return null;

  const displayName =
    profile.nama || profile.name || profile.full_name || "User";

  const displayRole =
    role === "student"
      ? "Mahasiswa"
      : role === "lecturer"
        ? "Dosen"
        : role || "User";

  const firstLetter = displayName.charAt(0).toUpperCase();

  const fields =
    role === "student"
      ? [
          { icon: Hash, label: "NIM", value: profile.nim },
          { icon: Mail, label: "Email", value: profile.email },
          {
            icon: BookOpen,
            label: "Program Studi",
            value:
              profile.prodi || profile.program_studi || profile.program?.name,
          },
          {
            icon: Building2,
            label: "Fakultas",
            value:
              profile.fakultas ||
              profile.faculty ||
              profile.program?.faculty?.name,
          },
          {
            icon: GraduationCap,
            label: "Semester",
            value: profile.semester ? String(profile.semester) : "-",
          },
          {
            icon: CalendarDays,
            label: "Angkatan",
            value: profile.angkatan ? String(profile.angkatan) : "-",
          },
        ]
      : [
          { icon: Hash, label: "NIDN", value: profile.nidn },
          { icon: Mail, label: "Email", value: profile.email },
          {
            icon: BookOpen,
            label: "Program Studi",
            value:
              profile.prodi || profile.program_studi || profile.program?.name,
          },
          {
            icon: Building2,
            label: "Fakultas",
            value:
              profile.fakultas ||
              profile.faculty ||
              profile.program?.faculty?.name,
          },
        ];

  function handleLogout() {
    logout();

    if (onLogout) {
      onLogout();
    }

    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Profil Saya"
      maxWidth="max-w-lg"
    >
      <div className="px-6 pb-6 pt-5">
        <div className="flex items-center gap-4 rounded-2xl bg-yellow-300/30 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white ring-2 ring-yellow-400/40">
            {firstLetter || <UserRound className="h-7 w-7" />}
          </div>

          <div className="min-w-0">
            <div className="truncate text-lg font-bold text-gray-900">
              {displayName}
            </div>

            <div className="mt-1 inline-flex items-center rounded-full bg-yellow-400 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-900">
              {displayRole}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {fields.map((field) => {
            const Icon = field.icon;

            return (
              <div
                key={field.label}
                className="rounded-2xl border border-gray-100 bg-gray-50/80 p-3.5"
              >
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500">
                  <Icon className="h-3 w-3" />
                  {field.label}
                </div>

                <div className="mt-1 break-words text-sm font-medium text-gray-900">
                  {field.value || "-"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled
            className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-400"
          >
            Profil hanya dapat diedit di sistem akademik
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 hover:cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
}
