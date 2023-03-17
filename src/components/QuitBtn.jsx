import { useState, useContext } from "react";

import axios from "axios";
import GetUserData from "./GetUserData";
import { TokenContext } from "../contexts/TokenProvider";
import { NavLink } from "react-router-dom";

const QuitBtn = ({ id, detail }) => {
  const { token } = useContext(TokenContext);
  const [renderRequest, setRenderRequest] = useState(false);
  const [quitModal, setQuitModal] = useState(false);
  const [hasQuit, setHasQuit] = useState(false);

  async function quitHandler() {
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
        console.log("user-quit-ok");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("user has quit this activity");
      setRenderRequest(true);
      setHasQuit(true);
      setQuitModal(false);
    }
  }
  return (
    <>
      {hasQuit ? (
        <>
          <div className="flex justify-center absolute top-[20vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[190px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
            Du har forladt {detail.name}. Det er vi kede af. Du er velkommen til
            at se, om vi har andre ting, der kunne være noget for dig.
          </div>
          <NavLink
            to="/aktiviteter"
            className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
          >
            Se vores andre aktiviteter
          </NavLink>
        </>
      ) : quitModal ? (
        <button
          onClick={(e) => setQuitModal(false)}
          className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Bliv på holdet
        </button>
      ) : (
        <button
          onClick={(e) => setQuitModal(true)}
          className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
        >
          Forlad
        </button>
      )}

      {quitModal && (
        <div className="absolute top-[20vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[190px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
          <p className="flex justify-center">
            Ønsker du virkelig at stoppe til {detail.name}?
          </p>
          <div className="flex justify-between w-[220px] mt-7">
            <button
              className="flex justify-center bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[100px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
              onClick={quitHandler}
            >
              Ja
            </button>
            <button
              className="flex justify-center bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[100px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
              onClick={(e) => setQuitModal(false)}
            >
              Nej
            </button>
          </div>
        </div>
      )}
      {renderRequest && <GetUserData />}
    </>
  );
};

export default QuitBtn;
