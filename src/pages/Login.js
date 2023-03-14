import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenProvider";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenCookie, setTokenCookie] = useCookie("trainer-cookie", undefined);
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/auth/token", {
        username: event.target.username.value,
        password: event.target.password.value,
      });

      if (response.status === 200) {
        if (event.target.remember.checked) {
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
    } finally {
      setIsLoading(false);
    }
  }

  console.log("token", token);

  useEffect(
    function () {
      if (token) {
        navigate("/profile");
      }
    },
    [token, navigate]
  );

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
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
    </>
  );
}
