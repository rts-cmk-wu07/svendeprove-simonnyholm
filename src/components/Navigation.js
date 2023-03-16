import { FiHome } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
//Feather icons login: FiLogIn
//Feather icons logout: FiLogOut

import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../contexts/TokenProvider";
import { setCookie } from "react-use-cookie";

const Navigation = () => {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [logoutModal, setLogOutModal] = useState(false);

  function handleLogout() {
    setCookie("dance-cookie", "", { days: 0 });
    setToken(null);
    setLogOutModal(false);
  }

  console.log("Logoutmodela", logoutModal);

  return (
    <>
      <nav className="bg-primaryTextColor mb-8 pt-4 w-full relative">
        <ul className="flex justify-between ml-[10vw] mr-[10vw]">
          <li className="rounded-full border-solid border-[2px] border-black w-12 h-12">
            <NavLink
              to="/aktiviteter"
              className="text-itemTextColor flex justify-center pt-[6px]"
            >
              <FiHome size={30} />
            </NavLink>
          </li>
          <li className="rounded-full border-solid border-[2px] border-black w-12 h-12">
            <NavLink
              to="/soeg"
              className="text-itemTextColor flex justify-center pt-[6px]"
            >
              <FiSearch size={30} />
            </NavLink>
          </li>
          <li className="rounded-full border-solid border-[2px] border-black w-12 h-12">
            <NavLink
              to="/kalender"
              className="text-itemTextColor flex justify-center pt-[6px]"
            >
              <FiCalendar size={30} />
            </NavLink>
          </li>
          <li className="rounded-full border-solid border-[2px] border-black w-12 h-12">
            {" "}
            {token ? (
              <button
                className="text-itemTextColor pt-[6px] pl-[8px]"
                onClick={(e) => setLogOutModal(true)}
              >
                <FiLogOut size={30} />
              </button>
            ) : (
              <NavLink
                className="text-itemTextColor flex justify-center pt-[6px]"
                to="/login"
              >
                <FiLogIn size={30} />
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
      {logoutModal && (
        <div className="absolute w-10 h-5 bottom-[100px] left-8">
          <p>Ønsker du at logge ud?</p>
          <div>
            <button onClick={handleLogout}>Ja</button>
            <button onClick={(e) => setLogOutModal(false)}>Nej</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
