import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";
import QuitBtn from "./QuitBtn";
import GetUserData from "./GetUserData";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

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

  function validateUser() {
    if (hasActivitySameWeekday.length >= 1) {
      setDayOccupied(true);
      setUserNotValid(true);
      return;
    } else {
      if (userData.age >= detail.minAge) {
        if (userData.age > detail.maxAge) {
          setTooOld(true);
          setUserNotValid(true);
          return;
        } else {
          if (detail.users.length >= detail.maxParticipants) {
            setActivityFull(true);
            setUserNotValid(true);
            return;
          } else {
            joinHandler();
          }
        }
      } else {
        setTooYoung(true);
        setUserNotValid(true);
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="opacity-90 flex justify-center absolute top-[18vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[23vh] overflow-hidden rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Du har allerede en aktivitet om {detail.weekday}en.
        </motion.div>
      )}
      {tooOld && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="opacity-90 flex justify-center absolute top-[18vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[23vh] overflow-hidden rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Du er desværre for gammel til at deltage i {detail.name}. Heldigvis
          har vi mange andre aktiviteter til dig.
        </motion.div>
      )}
      {activityFull && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="opacity-90 flex justify-center absolute top-[18vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[23vh] overflow-hidden rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          {detail.name} er desværre fyldt helt op. Heldigvis har vi mange andre
          aktiviteter til dig.
        </motion.div>
      )}
      {tooYoung && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="opacity-90 flex justify-center absolute top-[18vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[23vh] overflow-hidden rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Du er desværre for ung til at deltage i {detail.name}. Heldigvis har
          vi mange andre aktiviteter til dig.
        </motion.div>
      )}
      {renderRequest && <GetUserData />}
    </>
  );
};

export default JoinBtn;
