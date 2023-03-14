import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DependentReq from "../components/DependentReq.jsx";
import axios from "axios";

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
  //console.log("trainerId", classDetail?.trainerId);

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
            <article>
              <h1>{activityDetail.name}</h1>
              <p></p>
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
