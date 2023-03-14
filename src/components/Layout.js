import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TokenContext } from "../contexts/TokenProvider";
import { setCookie } from "react-use-cookie";

export default function Layout() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  function handleLogout() {
    setCookie("trainer-cookie", "", { days: 0 });
    setToken(null);
    navigate("/");
  }

  return (
    <>
      <main>
        <Outlet />
      </main>
      <header>
        <nav className="p-2">
          <NavLink to="/aktiviteter" className="p-3 text-[28px}">
            Aktiviteter
          </NavLink>

          {token ? (
            <button onClick={handleLogout}>Log out</button>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
      </header>
    </>
  );
}
