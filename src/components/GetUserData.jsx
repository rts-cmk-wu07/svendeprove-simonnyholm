import useAxios from "../hooks/useAxios";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";
import useCookie from "react-use-cookie";

const GetUserData = ({ consent }) => {
  const { token } = useContext(TokenContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userCookie, setUserCookie] = useCookie("user-cookie", undefined);

  console.log("tokenUserId", token?.userId);
  console.log("tokenToken", token?.token);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/users/${token?.userId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: "Bearer " + token?.token,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          if (consent) {
            const milliseconds = response.data.validUntil - Date.now();
            const validFor = milliseconds / (1000 * 60 * 60 * 24);
            setUserCookie(JSON.stringify(response.data), {
              days: validFor,
              SameSite: "Strict",
            });

            console.log("userCookie", userCookie);
          }
          setUserData(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [consent, token]);

  return <></>;
};

export default GetUserData;
