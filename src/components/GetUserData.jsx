import useAxios from "../hooks/useAxios";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../contexts/TokenProvider";

const GetUserData = ({ set }) => {
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
  const { token } = useContext(TokenContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("tokenUserId", token.userId);
  console.log("tokenToken", token.token);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/users/${token.userId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: "Bearer " + token.token,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [set, token]);

  console.log("userData", userData);

  return (
    <>
      <p>GetUserData</p>
    </>
  );
};

export default GetUserData;
