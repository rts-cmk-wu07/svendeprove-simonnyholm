import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InstructorPage from "../components/InstructorPage";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";

const Calendar = () => {
  const { token } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);
  const [calendarData, setCalendarData] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/users/${token.userId}/roster/${token.userId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: "Bearer " + token.token,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setCalendarData(response.data);
          console.log("OkCal");
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  console.log("caldat", calendarData);

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

  return (
    <div className="ml-[10vw] mr-[10vw] h-[100vh]">
      {token?.role === "instructor" && (
        <>
          <InstructorPage />
        </>
      )}
      {token && (
        <>
          <h1>Kalender</h1>
          <p>Hej {userData?.firstname}! Her er din holdplan:</p>
          <section>
            {userData?.activities.length >= 1 ? (
              sortedActivities.map((item, index) => (
                <article
                  className="mt-4 p-4 bg-primaryTextColor text-itemTextColor rounded-[11px]"
                  onClick={() => navigate("/aktivitet/" + item.id)}
                  key={index}
                >
                  <h2>{item.name}</h2>
                  <div className="flex justify-between">
                    <p>{item.weekday}</p>
                    <p>{item.time}</p>
                  </div>
                </article>
              ))
            ) : (
              <p>Du har ikke tilmeldt dig nogen hold.</p>
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
  );
};

export default Calendar;
