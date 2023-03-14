import useAxios from "../hooks/useAxios";

//reqafter start

import axios from "axios";
import { useState, useEffect } from "react";

//reqafter slut

const DependentReq = ({ trainerId, set }) => {
  console.log("dep", trainerId);
  /*
  const { data, loading, error } = useAxios({
    url: "http://localhost:4000/api/v1/trainers/" + trainerId,
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  */

  //reqafter start

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/trainers/" + trainerId
        );
        console.log(response);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [set]);

  //req after slut

  return (
    <>
      {loading && <p>...loading</p>}
      {data && <p>{data?.trainerName}</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default DependentReq;
