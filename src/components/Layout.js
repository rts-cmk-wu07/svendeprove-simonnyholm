import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TokenContext } from "../contexts/TokenProvider";
import { setCookie } from "react-use-cookie";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="h-screen font-primaryFont">
      <main className="z-30 bg-primaryPurple">
        <Outlet />
      </main>
      <header className="h-[8%] z-2 fixed bg-white w-full bottom-0">
        <Navigation />
      </header>
    </div>
  );
}
