import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InstructorPage from "../components/InstructorPage";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";
import { setCookie, getCookie } from "react-use-cookie";
import { motion } from "framer-motion";

const Calendar = () => {
  const { token, setToken } = useContext(TokenContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const [calendarData, setCalendarData] = useState([]);
  const [logoutModal, setLogOutModal] = useState(false);
  const navigate = useNavigate();

  const userActivities = userData?.activities;

  const map = {
    mandag: 1,
    tirsdag: 2,
    onsdag: 3,
    torsdag: 4,
    fredag: 5,
    lørdag: 6,
    søndag: 7,
  };

  const sortedActivities = userActivities?.sort((a, b) => {
    return map[a.day] - map[b.day];
  });

  console.log("sortedAct", sortedActivities);

  const storedToken = getCookie("token-cookie");

  console.log("STOREDTOKEN", storedToken);

  function handleLogout() {
    setToken(null);
    setUserData(null);
    setLogOutModal(false);
    setCookie("token-cookie", "", { days: 0 });
    setCookie("user-cookie", "", { days: 0 });
    navigate("/login");
  }

  return (
    <>
      <div className="ml-[10vw] mr-[10vw] h-[100vh]">
        {token?.role === "instructor" && (
          <>
            <InstructorPage />
          </>
        )}
        {token?.role === "default" && (
          <>
            <div className="w-full h-[30px]">
              <h1 className="pt-8 text-[36px] text-primaryTextColor bg-primaryPurple">
                Kalender
              </h1>
              <p className="text-primaryTextColor text-[18px]">
                Velkommen {userData?.firstname}! Her er din holdplan:
              </p>
            </div>

            <section className="pt-[100px]">
              {userData?.activities.length >= 1 ? (
                sortedActivities.map((item, index) => (
                  <article
                    className="mt-4 pl-4 pr-4 pt-3 pb-3 bg-primaryTextColor text-itemTextColor rounded-[11px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
                    onClick={() => navigate("/aktivitet/" + item.id)}
                    key={index}
                    role="button"
                  >
                    <h2 className="text-[24px]">{item.name}</h2>
                    <div className="flex justify-between">
                      <p className="text-[18px]">{item.weekday}</p>
                      <p className="text-[18px]">{item.time}</p>
                    </div>
                  </article>
                ))
              ) : (
                <p>Du har ikke tilmeldt dig nogen hold.</p>
              )}
              {storedToken && (
                <div className="w-full fixed flex justify-center bottom-[100px]">
                  <button
                    className=" bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[60vw] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
                    onClick={(e) => setLogOutModal(true)}
                  >
                    Log på anden bruger
                  </button>
                </div>
              )}
            </section>
          </>
        )}
        {!token && (
          <>
            <h1>Kalender</h1>
            <p>
              I kalenderen kan du som medlem se dine hold, og hvornår I skal
              mødes.
            </p>
          </>
        )}
      </div>
      {logoutModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-[20vh] right-[18vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[190px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          <p className="flex justify-center">Ønsker du at logge ud?</p>
          <div className="flex justify-between w-[220px] mt-7">
            <button
              className="flex justify-center bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[100px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
              onClick={handleLogout}
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

export default Calendar;
