import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

const Navigation = () => {
  return (
    <>
      <nav className="bg-primaryTextColor mb-8 pt-4 w-full">
        <ul className="flex justify-between ml-[10vw] mr-[10vw]">
          <li className="rounded-full border-solid border-[2px] border-black w-12 h-12">
            <NavLink
              to="/aktiviteter"
              className="text-itemTextColor flex justify-center pt-[6px]"
            >
              <FiHome size={30} />
            </NavLink>
          </li>
          <li className="rounded-full border-solid border-[2px] border-black w-12 h-12">
            <NavLink
              to="/soeg"
              className="text-itemTextColor flex justify-center pt-[6px]"
            >
              <FiSearch size={30} />
            </NavLink>
          </li>
          <li className="rounded-full border-solid border-[2px] border-black w-12 h-12">
            <NavLink
              to="/kalender"
              className="text-itemTextColor flex justify-center pt-[6px]"
            >
              <FiCalendar size={30} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
