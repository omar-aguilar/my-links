import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="mb-2 py-3 w-full border">
      <Link
        to="/"
        className="text-gray-800 hover:text-gray-500 text-base mr-2 py-2 px-4 hover:bg-gray-200"
      >
        Home
      </Link>
      <Link
        to="/add-link"
        className="text-gray-800 hover:text-gray-500 text-base mr-2 py-2 px-4 hover:bg-gray-200"
      >
        Add Link
      </Link>
      <Link
        to="/manage-domains"
        className="text-gray-800 hover:text-gray-500 text-base mr-2 py-2 px-4 hover:bg-gray-200"
      >
        Manage Domains
      </Link>
    </nav>
  );
};

export default Menu;
