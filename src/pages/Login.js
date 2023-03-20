import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenProvider";
import { UserDataContext } from "../contexts/UserDataProvider";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import useAxios from "../hooks/useAxios";
import GetUserData from "../components/GetUserData";
import { useFormik, validateYupSchema } from "formik";
import { motion } from "framer-motion";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../components/package/Loading";

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
      loggedOn();
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
          navigate("/kalender");
          //Velkomstbesked
        }
      }
    },
    [token, navigate]
  );

  const loggedOn = () => toast("Du er nu logget på");

  return (
    <>
      <div className="h-[100vh] bg-splashImage bg-no-repeat bg-cover bg-center relative z-20">
        <div className="z-30 bg-primaryPurple opacity-40 absolute top-0 h-[85vh] w-full clipPathPolygon"></div>
        <div className="absolute z-40 top-[25vh] pl-[10vw] pr-[10vw]">
          <div>
            <h1 className="text-[48px] text-primaryTextColor drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]">
              Log in
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="relative min-h-[60px] flex justify-center w-[80vw] mb-[10px]">
                <label className="absolute top-0 left-[5px] z-[51] pb-[10px]">
                  Username
                  <input
                    placeholder="brugernavn"
                    className="w-[80vw] h-[50px] absolute top-0 left-0 bg-primaryTextColor text-[18px] pl-[15px]"
                    type="text"
                    name="username"
                    id="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                </label>
              </div>
              <div className="relative min-h-[60px] flex justify-center w-[80vw] mb-[10px]">
                <label className="absolute top-0 left-[5px] pb-[10px]">
                  Password
                  <input
                    placeholder="adgangskode"
                    className="w-[80vw] h-[50px] absolute top-0 left-0 bg-primaryTextColor text-[18px] pl-[15px]"
                    type="password"
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </label>
              </div>
              <div className="w-full flex justify-center">
                <motion.button
                  className=" bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[60vw] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
                  type="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  Log in
                </motion.button>
              </div>
            </form>
          </div>
          <div className="mt-[1.5vh] flex justify-center">
            <label className="text-[18px] text-primaryTextColor drop-shadow-2xl]">
              Husk mig til næste gang!
              <input
                className="ml-3 w-4 h-4"
                onChange={handleConsent}
                type="checkbox"
                name="remember"
                id=""
              />
            </label>
          </div>
          <div>
            {formik.touched.username && formik.errors.username ? (
              <div className="w-full flex justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-secondaryPurple text-itemTextColor text-[18px] mt-[15px] pr-4 pl-4 pt-3 pb-3 w-[60vw] h-full rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
                >
                  {formik.errors.username}
                </motion.div>
              </div>
            ) : null}
            {formik.touched.password && formik.errors.password ? (
              <div className="w-full flex justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-secondaryPurple text-itemTextColor text-[18px] mt-[15px] pr-4 pl-4 pt-3 pb-3 w-[60vw] h-full rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
                >
                  {formik.errors.password}
                </motion.div>
              </div>
            ) : null}
          </div>
          {isLoading && (
            <div className="absolute top-[35vh] flex justify-center w-[80vw] mb-[10px] z-[80]">
              <LoadingAnimation color={"#5E2E53"} type={"spinningBubbles"} />
            </div>
          )}
          {error && (
            <div className="w-full flex justify-center">
              {error.response.status === 500 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-secondaryPurple text-itemTextColor text-[18px] mt-[15px] pr-4 pl-4 pt-3 pb-3 w-[60vw] h-full rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-semibold">
                    Kunne ikke logge dig ind!
                  </span>{" "}
                  Tjek venligst om dit brugernavn og din adgangskode er
                  indtastet korrekt!
                </motion.div>
              )}
              {error.response.status === 401 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-secondaryPurple text-itemTextColor text-[18px] mt-[15px] pr-4 pl-4 pt-3 pb-3 w-[60vw] h-full rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-semibold">
                    Kunne ikke logge dig ind!
                  </span>{" "}
                  Tjek venligst om dit brugernavn og din adgangskode er
                  indtastet korrekt!
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>{renderRequest === true && <GetUserData consent={consent} />}</div>
    </>
  );
}
