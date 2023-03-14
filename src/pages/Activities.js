import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/TokenProvider";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import ActivityCard from "../components/ActivityCard";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  var settings = {
    lazyLoad: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <>
      <h1>Aktiviteter</h1>
      <section className="ml-[10vw] mr-[6vw]">
        {isLoading && (
          <article>
            <h2>...loading</h2>
          </article>
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
