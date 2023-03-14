import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/TokenProvider";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [classes, setClasses] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { token } = useContext(TokenContext);

  useEffect(function () {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/classes"
        );
        console.log(response);
        if (response.status === 200) {
          setClasses(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log("klasser", classes);
  console.log(token);

  console.log("NEWREUTENSNACH");

  return (
    <>
      <h1>Home</h1>
      <section>
        {isLoading && (
          <article>
            <h2>...loading</h2>
          </article>
        )}
        {classes && (
          <>
            {classes.map((item, index) => (
              <article className="h-10 w-12 p-4 m-10" key={index}>
                <h2 onClick={() => navigate("/classdetails/" + item.id)}>
                  {item.className}
                </h2>
              </article>
            ))}
          </>
        )}
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
