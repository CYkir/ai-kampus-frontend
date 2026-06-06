

import { Icon } from "@iconify/react";
import UserAvatar from '../../assets/image/user_avatar.jpg';

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="bg-white p-2 rounded-3xl w-fit">
          <div className="flex items-center gap-4">
            <div className="bg-secondary text-white px-6 py-2 rounded-full text-lg font-medium  hover:cursor-pointer">
              Chat
            </div>

            {/* Inactive */}
            <div className="text-gray-500 px-5 py-2 text-lg font-lato  hover:cursor-pointer">
              Kontak
            </div>

            <div className="text-gray-500 px-5 py-2 text-lg font-lato  hover:cursor-pointer">
              Tentang AI Kampus
            </div>

            <div className="text-gray-500 px-5 py-2 text-lg font-lato  hover:cursor-pointer">
              Setting
            </div>
          </div>
        </div>

        <div className="bg-white p-2 rounded-3xl w-full max-w-md">
          <div className="flex items-center justify-between">
            {/* Kiri: Foto + Nama */}
            <div className="flex items-center gap-3">
              <img
                src={UserAvatar}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-800">Akun Demo</span>
            </div>

            {/* Kanan: Icon */}
            <div className="flex items-center gap-6 text-gray-600">
              <Icon icon="mdi:bell-outline" width="20" />
              <Icon icon="mdi:cog-outline" width="20" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
