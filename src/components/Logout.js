import { UserDataContext } from "../contexts/UserDataProvider";

const Logout = () => {
  const { token, setToken } = useContext(TokenContext);
  const { userData, setUserData } = useContext(UserDataContext);

  function handleLogout() {
    setCookie("token-cookie", "", { days: 0 });
    setToken(null);
    navigate("/");
  }

  return <div></div>;
};

export default Logout;
