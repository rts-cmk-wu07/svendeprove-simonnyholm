import { createContext, useEffect, useState } from "react";

import { getCookie } from "react-use-cookie";

export const UserDataContext = createContext(null);

export default function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(
    function () {
      if (userData === null) {
        const refreshUserData = getCookie("user-cookie");
        if (refreshUserData) {
          setUserData(JSON.parse(refreshUserData));
        }
      }
    },
    [userData]
  );

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}
