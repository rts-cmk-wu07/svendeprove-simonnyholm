import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";
import JoinedOrNot from "../components/JoinedOrNot";
import Full from "../components/Full";

const ActivityDetails = () => {
  const { id } = useParams();
  const [activityDetail, setActivityDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activityFull, setActivityFull] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/activities/" + id
        );
        console.log(response);
        if (response.status === 200) {
          setActivityDetail(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setActivityDetail, setIsLoading, setError, id]);

  function filterByUserId(item) {
    if (item.id === userData?.id) {
      return true;
    }
  }
  const hasJoinedActivity = activityDetail?.users.filter(filterByUserId);

  console.log("activityDetail", activityDetail);
  console.log("instructorId", activityDetail?.instructorId);
  console.log("token in details", token);
  console.log("userData in details", userData);

  const usersJoinedArr = activityDetail?.users.length;
  const maxPart = activityDetail?.maxParticipants;

  console.log("usersJoinedArr", usersJoinedArr);
  console.log("maxPart", maxPart);

  return (
    <>
      {isLoading && (
        <section>
          <article>
            <h1>...Loading</h1>
          </article>
        </section>
      )}
      {activityDetail && (
        <>
          <section>
            <div className="h-[55vh]">
              <img
                className="relative object-cover h-full w-full"
                src={activityDetail.asset.url}
                alt=""
              />
            </div>

            {token && (
              <>
                <JoinedOrNot id={id} detail={activityDetail} />
              </>
            )}

            {!token && (
              <NavLink
                to="/login"
                className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
              >
                <p>Log på for tilmelding</p>
              </NavLink>
            )}

            <article className="ml-[10vw] mr-[6vw] pt-[8vw] h-[45vh]">
              <h1 className="text-[24px] text-primaryTextColor">
                {activityDetail.name}
              </h1>
              <p className="text-[18px] text-primaryTextColor pt-1">
                {activityDetail.minAge}-{activityDetail.maxAge} år
              </p>

              <p className="text-[18px] text-primaryTextColor pt-1">
                <span className="capitalize">{activityDetail.weekday} </span>
                kl. {activityDetail.time}
              </p>
              <p className="text-[18px] text-primaryTextColor pt-5">
                {activityDetail.description}
              </p>
            </article>
          </section>
        </>
      )}

      {error && (
        <section>
          <article>
            <h1>Fejl</h1>
            <p>{error}</p>
          </article>
        </section>
      )}

      {usersJoinedArr >= maxPart ? (
        token ? (
          hasJoinedActivity.length >= 1 ? (
            <></>
          ) : (
            <>
              {" "}
              <div className="flex justify-center absolute top-[20vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[190px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
                {activityDetail?.name} er meget populært og er desværre fyldt
                helt op. Heldigvis har vi mange andre aktiviteter til dig.
              </div>
              <NavLink
                to="/aktiviteter"
                className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
              >
                Se vores andre aktiviteter
              </NavLink>
            </>
          )
        ) : (
          <></>
        )
      ) : token ? (
        <></>
      ) : (
        <div className="flex justify-center absolute top-[20vh] right-[10vw] bg-secondaryPurple text-itemTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[190px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
          Der er stadig ledige pladser på {activityDetail?.name}!
        </div>
      )}
    </>
  );
};

export default ActivityDetails;
