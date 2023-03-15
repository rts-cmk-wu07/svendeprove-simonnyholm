import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DependentReq from "../components/DependentReq.jsx";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ActivityDetails = () => {
  const { id } = useParams();
  const [activityDetail, setActivityDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [renderDependentReq, setRenderDependentReq] = useState(false);

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
        setRenderDependentReq(true);
      }
    })();
  }, [setActivityDetail, setIsLoading, setError, id]);

  console.log("classDetail", activityDetail);
  console.log("trainerId", activityDetail?.instructorId);

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

            <NavLink
              to="/login"
              className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
            >
              <p>Log på for tilmelding</p>
            </NavLink>

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
    </>
  );
};

export default ActivityDetails;

/*
            <button className="absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
              Log på for tilmelding
            </button>
*/
