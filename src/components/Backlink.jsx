import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BackLink = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-primaryTextColor pt-3 z-50 bg-primaryPurple fixed top-12 left-8 flex justify-center rounded-full border-solid border-[2px] border-primaryTextColor w-12 h-12"
    >
      <BiArrowBack size={22} />
    </button>
  );
};

export default BackLink;
