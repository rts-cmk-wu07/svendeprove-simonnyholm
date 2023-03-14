import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button onClick={() => navigate("/aktiviteter/")}>Kom i gang</button>
      </div>
    </>
  );
};

export default Welcome;
