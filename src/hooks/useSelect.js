import { useState } from "react";

export default function useSelect(options) {
  const [selected, setSelected] = useState("Vælg noget");

  function selectHandler(event) {
    setSelected(event.target.value);
  }

  const select = (
    <>
      <select name="hookSelect" onChange={selectHandler}>
        <option defaultValue>Vælg én</option>
        {options.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </>
  );

  return { selected, select };
}

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

    const { select, selected } = useSelect(
    data?.map((item) => item.className) ?? []
    );

    return(

        <section>{loading ? <p>...loading</p> : select}</section>
        <section>{loading ? <p>...loading</p> : selected}</section>
    

    )
}




*/
