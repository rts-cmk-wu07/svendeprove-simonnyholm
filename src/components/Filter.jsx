import { useEffect, useState } from "react";

const Filter = () => {
  const arrayA = [
    { title: "Eggs", desc: "They are good" },
    { title: "Eggeschnaps", desc: "They are drunk" },
    { title: "Milk", desc: "It is white" },
    { title: "Milkcake", desc: "It is whitish" },
    { title: "Milkeschnitte", desc: "It is not white" },
  ];
  const arrayB = [
    { title: "Cucumbers", desc: "They are long" },
    { title: "Carrots", desc: "They are orange" },
    { title: "Cucumberleaves", desc: "They are from cucumbers" },
  ];

  //find ud af at lave opdelt søgeresultat med udgpkt i de givne kategorier (samt evt et samlet søgeresultat vha fx flatmap)

  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResult] = useState();
  const [showResults, setShowResults] = useState(false);

  function handleSearch(event) {
    setSearchTerm(event.target.value);

    var result = arrayA.filter((item) => item.title.includes(searchTerm));
    console.log("result", result);

    if (result.length >= 1) {
      console.log("lang");
      setSearchResult(result);
      setShowResults(true);
    }
  }

  console.log("sr", searchResults);

  return (
    <div>
      <input onChange={handleSearch} type="text" />
      <div>
        <></>
        {showResults ? (
          <>
            {searchResults.map((item, index) => (
              <article key={index}>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </article>
            ))}
          </>
        ) : (
          <p>prut</p>
        )}
      </div>
    </div>
  );
};

export default Filter;
