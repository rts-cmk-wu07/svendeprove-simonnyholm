import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="p-2">
        <ul>
          <li>
            <NavLink to="/aktiviteter" className="p-3 text-[28px}">
              Aktiviteter
            </NavLink>
          </li>
          <li>
            <NavLink to="/soeg" className="p-3 text-[28px}">
              Søg
            </NavLink>
          </li>
          <li>
            <NavLink to="/kalender" className="p-3 text-[28px}">
              Kalender
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
