import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";
import QuitBtn from "./QuitBtn";
import GetUserData from "./GetUserData";
import { NavLink } from "react-router-dom";

const JoinBtn = ({ id, detail }) => {
  const { token } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);
  const [hasJoined, setHasJoined] = useState(false);
  const [renderRequest, setRenderRequest] = useState(false);
  const [dayOccupied, setDayOccupied] = useState(false);
  const [tooOld, setTooOld] = useState(false);
  const [activityFull, setActivityFull] = useState(false);
  const [tooYoung, setTooYoung] = useState(false);
  const [userNotValid, setUserNotValid] = useState(false);
  console.log("userActivities", userData.activities);

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
      setDayOccupied(true);
      setUserNotValid(true);
      //fejlbesked
      return;
    } else {
      if (userData.age >= detail.minAge) {
        if (userData.age > detail.maxAge) {
          console.log("Du er for gammel til at deltage");
          setTooOld(true);
          setUserNotValid(true);
          return;
        } else {
          if (detail.users.length >= detail.maxParticipants) {
            setActivityFull(true);
            setUserNotValid(true);
            console.log("Holdet er desværre fyldt op");
            //fejlbesked
            return;
          } else {
            joinHandler();
          }
        }
      } else {
        setTooYoung(true);
        console.log("Du er ikke gammel nok til at deltage");
        setUserNotValid(true);
        //fejlbesked
        return;
      }
    }
  }

  async function joinHandler() {
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
      setRenderRequest(true);
      console.log("joined");
      setHasJoined(true);
    }
  }

  // {hasJoined ? (row.isGrouped ? "GroupedRow" : "") : "SelectedRow"}

  return (
    <>
      {hasJoined ? (
        <QuitBtn id={id} detail={detail} />
      ) : userNotValid ? (
        <NavLink
          to="/aktiviteter"
          className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Se vores andre aktiviteter
        </NavLink>
      ) : (
        <button
          onClick={validateUser}
          className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Tilmeld dig
        </button>
      )}
      {dayOccupied && (
        <div className="flex justify-center absolute top-[40vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
          Du har allerede en aktivitet om {detail.weekday}en.
        </div>
      )}
      {tooOld && (
        <div className="flex justify-center absolute top-[20vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[190px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
          Du er desværre for gammel til at deltage i {detail.name}. Heldigvis
          har vi mange andre aktiviteter til dig.
        </div>
      )}
      {activityFull && (
        <div className="flex justify-center absolute top-[20vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[190px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
          {detail.name} er desværre fyldt helt op. Heldigvis har vi mange andre
          aktiviteter til dig.
        </div>
      )}
      {renderRequest && <GetUserData />}
    </>
  );
};

export default JoinBtn;
