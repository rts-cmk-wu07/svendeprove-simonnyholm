import { useState } from "react";
import ActivityCard from "./ActivityCard";

const FilterNResults = ({ arr }) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  function handleSearch(event) {
    const searchTermVar = event.target.value;
    setSearchTerm(searchTermVar);

    const result = arr?.filter(
      (item) =>
        item.className.includes(searchTermVar) ||
        item.classDescription.includes(searchTermVar)
    );
    console.log("result", result);
    console.log("Sterm", searchTermVar);
    console.log("Sresult", searchResult);

    setSearchResult(result);
    if (searchTerm === null) {
      setSearchResult(null);
    }

    console.log("searchResult", searchResult);
  }

  return (
    <>
      <input onChange={handleSearch} type="text" />
      {searchResult &&
        searchResult?.map((item, index) => (
          <ActivityCard item={item} index={index} />
        ))}
      {searchResult === null && (
        <p>
          Der blev ikke fundet nogen aktiviteter. Prøv at søge efter noget
          andet!
        </p>
      )}
    </>
  );
};

export default FilterNResults;

/*

In parent component:
--------------------

exampleComponent(){

  const { data, loading, error } = useA({
    url: "EXAMPLEhttp://localhost:4000/api/v1/classesEXAMPLE",
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

    return(

    <FilterNResults arr={data} />

    )
}




*/
