"use client";

import { useEffect, useState } from "react";
import { logout } from "../../../actions/auth.action";
import { getUserDataFromCookie } from "../../../actions/user.action";
import { UserData } from "../../../types";

import { HiOutlineLogout } from "react-icons/hi";

const Header = () => {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    if (sessionStorage.getItem("userData"))
      setUserData(JSON.parse(sessionStorage.getItem("userData")!));
    else {
      getUserDataFromCookie().then((data: UserData) => {
        setUserData(data);
        sessionStorage.setItem("userData", JSON.stringify(data));
      });
    }
  }, []);

  return (
    <header className="shadow p-3 flex justify-between items-center">
      <div>
        <p className="text-4xl text-[#006bff] font-extrabold">Welcome!</p>
        <p>You can view and upload photos here</p>
      </div>

      <div className="flex gap-5 items-center justify-center">
        <p>{userData?.name}</p>
        <button
          onClick={() => logout()}
          className="bg-red-500 text-white py-2 px-7 rounded-xl flex gap-2 items-center"
        >
          <p className="text-lg hidden md:block">Log out</p>
          <HiOutlineLogout className="text-2xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
