import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios({ url, method = "GET", headers = {} }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      (async function () {
        try {
          if (!url) {
            throw new Error("missing url parameter");
          } //guard clause
          setLoading(true);
          const response = await axios({ url, method, headers });
          setData(response.data);
        } catch (error) {
          //her kunne være importeret en logging service fx sentry.io
          console.error(error);
          setError("Noget gik helt galt");
        } finally {
          setLoading(false);
        }
      })();
    },
    // eslint-disable-next-line
    [url]
  );

  return { data, loading, error };
}

/*


exampleComponent(){

  
  const { data, loading, error } = useA({
    url: "http://localhost:4000/api/v1/classes",
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

      return(

    <div>
    MAP OVER eller RENDER DATA
    </div>
    

    )
}

*/
