import { Link } from "react-router-dom";

const Navbaaar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200">
      <Link to="/" className="font-extrabold text-xl">
        Ey<span className="text-yellow-500">Auto</span>
        <span className="text-xs bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded ml-2">
          Driver Portal
        </span>
      </Link>

      <div className="flex items-center space-x-6 text-sm font-semibold">
        <Link to="/" className="text-gray-600 hover:text-black">
          Home
        </Link>
        <Link to="/to-chooseride" className="text-gray-600 hover:text-black">
          Book Ride
        </Link>
        <Link to="/to-dashboard" className="text-yellow-600 hover:text-yellow-700">
          Driver Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Navbaaar;
