import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import useAxios from "../hooks/useAxios";
import GetUserData from "../components/GetUserData";

export default function BackupLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [tokenCookie, setTokenCookie] = useCookie("token-cookie", undefined);
  const [renderRequest, setRenderRequest] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);
  const [hasUsername, setHasUsername] = useState(null);
  const [hasPassword, setHaspassword] = useState(null);
  const [resp, setResp] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username.length >= 1) {
      if (password.length >= 1) {
        try {
          const response = await axios.post(
            "http://localhost:4000/auth/token",
            {
              username: event.target.username.value,
              password: event.target.password.value,
            }
          );

          setResp(response.data.message);
          console.log("resp", resp);

          if (response.status === 200) {
            if (event.target.remember.checked) {
              setConsent(true);
              const milliseconds = response.data.validUntil - Date.now();
              const validFor = milliseconds / (1000 * 60 * 60 * 24);

              setTokenCookie(JSON.stringify(response.data), {
                days: validFor,
                SameSite: "Strict",
              });

              console.log("tokenCookie", tokenCookie);
            }

            setToken(response.data);
            console.log(token);
          } else {
            setRenderRequest(false);
            return;
          }
        } catch (error) {
          setError(error);
          return;
        } finally {
          setRenderRequest(true);
          setHasUsername(true);
          setHaspassword(true);
          setIsLoading(false);
          setIsDone(true);
        }
      } else {
        setHaspassword(false);
        console.log("Skriv venligt dit kodeord");
      }
    } else {
      setHasUsername(false);
      console.log("Skriv venligt dit brugernavn");
    }
  }

  console.log("token", token);

  useEffect(
    function () {
      if (consent) {
        if (isDone) {
          navigate("/kalender");
          //Velkomstbesked
        }
      } else {
        if (isDone) {
          navigate(-1);
          //Velkomstbesked
        }
      }
    },
    [token, navigate]
  );

  return (
    <>
      <div className="h-[100vh] bg-splashImage bg-no-repeat bg-cover bg-center z-[80] flex justify-center">
        <div>
          <h1 className="text-[48px] text-primaryTextColor drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
            Log in
          </h1>
          <form onSubmit={handleSubmit}>
            <label className="">
              Username
              <input type="text" name="username" />
            </label>
            <label>
              Password
              <input type="password" name="password" />
            </label>
            <label htmlFor="">
              {" "}
              Husk login!
              <input type="checkbox" name="remember" id="" />
            </label>
            <button type="submit">Log in</button>
            {isLoading && <p>Loading...</p>}
          </form>
          <div>
            {isLoading && <div>Loading response...</div>}
            {error && (
              <div>
                <p>{error}</p>
              </div>
            )}

            {hasUsername === false && (
              <div>
                <p>Indtast venligst dit brugernavn</p>
              </div>
            )}
            {hasPassword === false && (
              <div>
                <p>Indtast venligst din andgangskode</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>{renderRequest && <GetUserData consent={consent} />}</div>
    </>
  );
}
