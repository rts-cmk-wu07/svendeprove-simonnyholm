
import { createContext, useEffect, useState } from "react";




import { getCookie } from "react-use-cookie";

export const TokenContext = createContext(null);

export default function TokenProvider({ children }) {

  const [token, setToken] = useState(null);

  useEffect(
    function () {
      if (token === null) {
        const refreshToken = getCookie("trainer-cookie");
        if (refreshToken) {
          setToken(JSON.parse(refreshToken));
        }
      }
    },
    [token]
  );


  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
