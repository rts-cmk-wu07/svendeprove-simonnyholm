import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TokenContext } from "../contexts/TokenProvider";
import { setCookie } from "react-use-cookie";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <header>
        <Navigation />
      </header>
    </>
  );
}
