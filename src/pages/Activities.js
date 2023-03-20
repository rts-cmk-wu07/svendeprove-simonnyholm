import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/TokenProvider";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/package/Loading";

import ActivityCard from "../components/ActivityCard";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { token } = useContext(TokenContext);

  useEffect(function () {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/activities"
        );
        console.log(response);
        if (response.status === 200) {
          setActivities(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log("activities", activities);
  console.log(token);

  return (
    <>
      <div className="fixed top-0 h-11 w-full z-10">
        <h1 className="pt-8 text-[36px] text-primaryTextColor pl-[10vw] bg-primaryPurple">
          Aktiviteter
        </h1>

        <div className="h-[30px] bg-gradient-to-b from-primaryPurple to-transparent"></div>
      </div>

      <section className="ml-[10vw] mr-[6vw] pt-[120px] pb-24">
        {isLoading && (
          <div className="absolute top-[35vh] flex justify-center w-[80vw] mb-[10px] z-[80]">
            <LoadingAnimation color={"#EAEAEA"} type={"spinningBubbles"} />
          </div>
        )}
        {activities &&
          activities?.map((item, index) => (
            <>
              <ActivityCard item={item} index={index} />
            </>
          ))}

        {error && (
          <article>
            <h2>Fejl</h2>
            <p>{error}</p>
          </article>
        )}
      </section>
    </>
  );
}
