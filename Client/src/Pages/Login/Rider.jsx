import { Link } from "react-router-dom";
import { Navigation, Package, ArrowRight } from "lucide-react";

const Rider = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl w-full">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-yellow-200">
          <h1 className="text-3xl font-extrabold mb-4 text-gray-900">
            Go anywhere with Ey<span className="text-yellow-500">Auto</span>
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Connecting riders with friendly auto rickshaw drivers in Valanchery.
          </p>

          <div className="flex space-x-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 font-bold py-2.5 rounded-xl text-sm">
              <Navigation size={16} />
              <span>Ride</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 font-semibold py-2.5 rounded-xl text-sm text-gray-700">
              <Package size={16} />
              <span>Package</span>
            </button>
          </div>

          <Link
            to="/to-chooseride"
            className="w-full bg-black hover:bg-yellow-400 hover:text-black text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <span>Open Trip Planner</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="map-img max-w-lg w-full">
          <img
            className="rounded-2xl shadow-xl w-full object-cover border border-gray-200"
            src="/images/map.png"
            alt="Valanchery Map"
          />
        </div>
      </div>
    </div>
  );
};

export default Rider;
