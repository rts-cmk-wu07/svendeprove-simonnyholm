import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TokenContext } from "../contexts/TokenProvider";
import { setCookie } from "react-use-cookie";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="font-primaryFont">
      <main className="bg-primaryPurple">
        <Outlet />
      </main>
      <div className="h-[20px] w-full fixed bottom-[65px] z-10 bg-gradient-to-b from-transparent to-gray-800"></div>
      <header className="h-[9%] z-20 fixed bg-primaryTextColor w-full bottom-[0]">
        <Navigation />
      </header>
    </div>
  );
}
