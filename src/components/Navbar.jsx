import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="m-3 p-3 text-emerald-600 text-2xl font-bold bg-gray-800 flex flex-row items-center justify-center gap-4 rounded-md">
      <NavLink to="/">Home</NavLink>

      <NavLink to="/pastes">Pastes</NavLink>
    </div>
  );
};

export default Navbar;
