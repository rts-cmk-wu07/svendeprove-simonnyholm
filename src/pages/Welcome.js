import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[100vh] bg-splashImage bg-no-repeat bg-cover bg-center z-[80]">
        <h1 className="opacity-0">Landrup Dans</h1>
        <div>
          <p className="font-extrabold font-roboto text-[36px] text-transparent uppercase first">
            Landrup
          </p>
          <p className="font-semibold font-racing text-[72px] uppercase text-[#e856eb] sekondo">
            Dans
          </p>
        </div>
        <div className="w-[242px] h-[14px] bg-[#913693]"></div>

        <div></div>
        <button
          className="flex justify-center absolute top-[45vh] right-[10vw] bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[249px] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
          onClick={() => navigate("/aktiviteter/")}
        >
          Kom i gang
        </button>
      </div>
    </>
  );
};

export default Welcome;
