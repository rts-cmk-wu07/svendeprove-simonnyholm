import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative h-[100vh] bg-splashImage bg-no-repeat bg-cover bg-center z-[80]">
        <h1 className="opacity-0">Landrup Dans</h1>
        <div>
          <div className="shadowed">
            <p className="absolute top-[43vh] left-[8vw] font-extrabold font-roboto text-[36px] text-transparent uppercase first">
              Landrup
            </p>
          </div>
          <p className="absolute top-[48vh] left-[8vw] font-semibold font-racing text-[72px] uppercase text-[#e856eb] sekondo">
            Dans
          </p>
        </div>
        <div className="absolute top-[60vh] w-[58vw] h-[14px] bg-[#913693]"></div>

        <div className="w-full absolute h-[20vh] flex justify-center top-[83vh]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className=" bg-primaryPurple text-primaryTextColor text-[18px] pr-4 pl-4 pt-3 pb-3 w-[60vw] h-[54px] rounded-[10px] drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)]"
            onClick={() => navigate("/aktiviteter/")}
          >
            Kom i gang
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
