import { NavLink } from 'react-router-dom';
import { routes } from '../../config/routes';

const routeValues = Object.values(routes).filter((route) => !route.hideInMenu);
const Menu = () => {
  return (
    <nav className="mb-2 py-3 w-full border">
      {routeValues.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) => {
            const activeClasses = 'bg-gray-300 rounded';
            return `text-gray-800 hover:text-gray-500 text-base mr-2 py-2 px-4 hover:bg-gray-200 ${
              isActive ? activeClasses : ''
            }`;
          }}
        >
          {route.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Menu;
