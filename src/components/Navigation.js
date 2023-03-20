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
import { UserDataContext } from "../contexts/UserDataProvider";
import { setCookie, getCookie } from "react-use-cookie";
import { motion } from "framer-motion";

const Navigation = () => {
  const { token, setToken } = useContext(TokenContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [logoutModal, setLogOutModal] = useState(false);
  const [loggedInUsingCookie, setLoggedInUsingCookie] = useState(false);

  console.log("token in nav", token);

  const storedToken = getCookie("token-cookie");

  console.log("STOREDTOKEN", storedToken);

  function loginUsingCookie() {
    if (storedToken) {
      setToken(JSON.parse(storedToken));
      setLoggedInUsingCookie(true);

      //Besked om at bruger er logget ind
      console.log("Login using cookie");
      navigate("/kalender");
    }
  }

  console.log("loggedInUsingCookie", loggedInUsingCookie);

  function handleLogout() {
    setToken(null);
    setUserData(null);
    setLogOutModal(false);
  }

  function handleLogoutStoredToken() {
    setToken(null);
    setUserData(null);
    setLogOutModal(false);
    setCookie("token-cookie", "", { days: 0 });
    setCookie("user-cookie", "", { days: 0 });
    navigate("/aktiviteter");
  }

  console.log("Logoutmodal", logoutModal);

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
            ) : storedToken ? (
              <button
                className="text-itemTextColor pt-[6px] pl-[8px]"
                onClick={loginUsingCookie}
              >
                <FiLogIn size={30} />
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-[40vh] right-[18vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[190px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          <p className="flex justify-center">Ønsker du at logge ud?</p>
          <div className="flex justify-between w-[220px] mt-7">
            <button
              className="flex justify-center bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[100px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
              onClick={storedToken ? handleLogoutStoredToken : handleLogout}
            >
              Ja
            </button>
            <button
              className="flex justify-center bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[100px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
              onClick={(e) => setLogOutModal(false)}
            >
              Nej
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
