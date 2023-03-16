import { useState, useContext, useEffect } from "react";

import axios from "axios";
import { NavLink } from "react-router-dom";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";

const JoinBtn = ({ id, detail }) => {
  const { token } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);
  const [hasJoined, setHasJoined] = useState(false);
  const [quitModal, setQuitModal] = useState(false);

  console.log("userActivities", userData.activities);
  console.log("details in join-weekday", detail.weekday);

  function filterByUserId(item) {
    if (item.id === userData.id) {
      return true;
    }
  }
  const hasJoinedActivity = detail.users.filter(filterByUserId);

  function filterByActivityWeekday(item) {
    if (item.weekday === detail.weekday) {
      return true;
    }
  }
  const hasActivitySameWeekday = userData.activities.filter(
    filterByActivityWeekday
  );

  console.log("hasWeekday", hasActivitySameWeekday);

  function validateUser(event) {
    if (hasActivitySameWeekday.length >= 1) {
      console.log("Du har allerede et hold samme dag");
      //fejlbesked
      return;
    } else {
      joinHandler();
    }
  }

  async function joinHandler(event) {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/users/${token.userId}/activities/${id}`,
        undefined,
        {
          headers: {
            authorization: "Bearer " + token.token,
          },
        }
      );

      if (response.status === 200) {
        console.log("okUser");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("joined");
    }
  }

  async function quitHandler(event) {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/users/${token.userId}/activities/${id}`,
        {
          headers: {
            authorization: "Bearer " + token.token,
          },
        }
      );

      if (response.status === 200) {
        setHasJoined(false);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("user has quit this activity");
      setQuitModal(false);
    }
  }

  /*
  if (hasJoinedActivity.length >= 1) {
    console.log("Du er allerede på holdet til at begynde med");
    setHasJoined(true);
    //fejlbesked
  }
  */

  return (
    <>
      {hasJoined ? (
        <button
          onClick={(e) => setQuitModal(true)}
          className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Forlad
        </button>
      ) : (
        <button
          onClick={validateUser}
          className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Tilmeld dig
        </button>
      )}
      {quitModal && (
        <div className="absolute w-10 h-5 bottom-[300px] left-8 bg-secondaryPurple">
          <p>Ønsker du at forlade holdet?</p>
          <div>
            <button onClick={quitHandler}>Ja</button>
            <button onClick={(e) => setQuitModal(false)}>Nej</button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinBtn;
