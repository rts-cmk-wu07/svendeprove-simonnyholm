import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import useAxios from "../hooks/useAxios";
import GetUserData from "../components/GetUserData";
import { useFormik, validateYupSchema } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Indtast venligst dit brugernavn";
  }

  if (!values.password) {
    errors.password = "Indtast venligst din adgangskode";
  }

  return errors;
};

export default function BackupLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tokenCookie, setTokenCookie] = useCookie("token-cookie", undefined);
  const [renderRequest, setRenderRequest] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);
  const [consentValue, setConsentValue] = useState(false);
  const [valuepost, setValuepost] = useState(null);

  const navigate = useNavigate();

  function handleConsent(event) {
    setConsentValue(event.target.checked);
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      setValuepost(JSON.stringify(values, null, 2));
      handleSubmit(values);
    },
  });

  console.log("consentValue", consentValue);

  async function handleSubmit(values) {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/token",
        values
      );

      if (response.status === 200) {
        if (consentValue === true) {
          setConsent(true);
          const milliseconds = response.data.validUntil - Date.now();
          const validFor = milliseconds / (1000 * 60 * 60 * 24);
          setTokenCookie(JSON.stringify(response.data), {
            days: validFor,
            SameSite: "Strict",
          });

          console.log("tokenCookie", tokenCookie);
        } else {
          //session cookie??
        }
        setToken(response.data);
        console.log(token);
      }
    } catch (error) {
      setError(error);
      setRenderRequest(false);
    } finally {
      setRenderRequest(true);
      setIsLoading(false);
      setIsDone(true);
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
      <div className="h-[100vh] bg-splashImage bg-no-repeat bg-cover bg-center z-[80]">
        <div>
          <h1 className="text-[48px] text-primaryTextColor drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
            Log in
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <label className="">
              Username
              <input
                type="text"
                name="username"
                id="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </label>

            <button type="submit">Log in</button>
          </form>
        </div>
        <div>
          <label htmlFor="">
            {" "}
            Husk mig til næste gang!
            <input
              onChange={handleConsent}
              type="checkbox"
              name="remember"
              id=""
            />
          </label>
        </div>
        <div>
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        {isLoading && <div>Loading...</div>}
        {error && (
          <div>
            <h3>Hovsa!</h3>
            {error.response.status === 500 && (
              <p>
                Der lader til at være problemer med at logge dig på! Tjek
                venligst om dit brugernavn og di adgangskode er indtastet
                korrekt!
              </p>
            )}
            {error.response.status === 401 && (
              <p>
                Der lader til at være problemer med at logge dig på! Tjek
                venligst om dit brugernavn og di adgangskode er indtastet
                korrekt!
              </p>
            )}
          </div>
        )}
      </div>

      <div>{renderRequest === true && <GetUserData consent={consent} />}</div>
    </>
  );
}
