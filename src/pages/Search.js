import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/TokenProvider";
import { useNavigate } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import FilterNResults from "../components/FilterNResults";

const Search = () => {
  const [allActivities, setAllActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [patchStyling, setPatchStyling] = useState(false);

  useEffect(
    function () {
      (async function () {
        try {
          const response = await axios.get(
            "http://localhost:4000/api/v1/activities"
          );
          console.log(response);
          if (response.status === 200) {
            setAllActivities(response.data);
          }
        } catch (error) {
          setError(error);
          console.log(error);
        } finally {
          setIsLoading(false);
          setIsDone(true);
          setSearchFeedback("untyped");
          setPatchStyling("fill");
        }
      })();
    },
    [isDone]
  );

  console.log("allActivities", allActivities);

  function handleSearch(event) {
    const searchTermVar = event.target.value.toLowerCase();
    setSearchTerm(searchTermVar);
    setPatchStyling("unfill");
    setHasTyped(true);

    setSearchFeedback("typed");

    const result = allActivities?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTermVar) ||
        item.description.toLowerCase().includes(searchTermVar) ||
        item.weekday.toLowerCase().includes(searchTermVar)
    );

    setSearchResult(result);

    if (result.length < 1) {
      console.log("under1");
      setSearchFeedback("<1");
      setPatchStyling("fill");
    }

    if (result.length === 1) {
      setPatchStyling("fill");
    }

    if (result.length === 2) {
      setPatchStyling("unfill");
    }

    if (hasTyped === true) {
      if (event.target.value === "") {
        console.log("TOM");
        setSearchResult([]);
        setSearchFeedback("erased");
        setPatchStyling("fill");
      }
    }
  }


  return (
    <div
      className={
        patchStyling === "unfill"
          ? "h-full bg-primaryPurple"
          : "h-[100vh] bg-primaryPurple"
      }
    >
      <section className="pl-[10vw] mr-[6vw] pt-[10px] h-full bg-primaryPurple">
        {isLoading && <div>Loading...</div>}
        {allActivities && (
          <>
            <div className="fixed top-0 w-full z-10 ">
              <div className="h-[150px] bg-primaryPurple">
                <h1 className="pt-8 pb-2 text-[36px] text-primaryTextColor bg-primaryPurple">
                  Søg
                </h1>
                <input
                  className="h-[50px] w-[80vw] bg-secondaryPurple opacity-25"
                  onChange={handleSearch}
                  type="text"
                />
              </div>
              <div className="h-[62px] bg-gradient-to-b from-primaryPurple to-transparent"></div>
            </div>

            <section className="pt-[190px] h-full pb-[100px] bg-primaryPurple">
              {searchResult &&
                searchResult?.map((item, index) => (
                  <ActivityCard item={item} index={index} />
                ))}
              {searchFeedback === "untyped" && (
                <div className="mr-5 pt-[10px]">
                  <h2 className=" text-primaryTextColor text-[24px]">
                    Søg på aktiviteter!
                  </h2>
                  <p className="text-primaryTextColor text-[18px] pt-2">
                    Find dit nye hold blandt vores mange aktiviteter.
                  </p>
                </div>
              )}
              {searchFeedback === "<1" && (
                <div className="pt-[10px] mr-5">
                  <h2 className="text-primaryTextColor text-[24px]">
                    Intet match
                  </h2>
                  <p className="text-primaryTextColor text-[18px] pt-2">
                    Der blev ikke fundet nogen aktiviteter. Prøv at søge efter
                    noget andet!
                  </p>
                  <p className="text-primaryTextColor text-[18px] pt-2">
                    Tip: Du kan for eksempel prøve at søge efter en dansestil,
                    en teknik eller hvilken ugedag, du er interesseret i!
                  </p>
                </div>
              )}
              {searchFeedback === "erased" && (
                <div className="pt-[10px] mr-5">
                  <h2 className="text-primaryTextColor text-[24px]">
                    Fandt du ikke det, du ledte efter?
                  </h2>
                  <p className="text-primaryTextColor text-[18px] pt-2">
                    Tip: Du kan for eksempel prøve at søge efter en dansestil,
                    en teknik eller hvilken ugedag, du er interesseret i!
                  </p>
                </div>
              )}
            </section>
          </>
        )}

        {error && <p>{error}</p>}
      </section>
    </div>
  );
};

export default Search;
