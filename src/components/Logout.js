const Logout = () => {
  const { token, setToken } = useContext(TokenContext);

  function handleLogout() {
    setCookie("token-cookie", "", { days: 0 });
    setToken(null);
    navigate("/");
  }

  return <div></div>;
};

export default Logout;
