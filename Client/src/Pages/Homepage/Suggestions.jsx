import { Link } from "react-router-dom";

const Suggestions = () => {
  return (
    <div className="container mx-auto my-10 px-4 lg:px-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Ride Options in Valanchery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex bg-yellow-50 border border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition duration-300 rounded-2xl justify-between p-6 items-center">
          <div className="text-left">
            <h3 className="font-extrabold text-xl text-gray-900 mb-1">Auto Rickshaw</h3>
            <p className="text-xs text-gray-600 mb-4">
              Quick trips through Valanchery town & suburbs.
            </p>
            <Link
              to="/to-chooseride"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold py-2 px-4 rounded-xl shadow-sm"
            >
              Book Auto
            </Link>
          </div>
          <img
            className="h-24 w-24 object-contain transform hover:scale-105 transition-transform"
            src="/images/rideauto.png"
            alt="Auto Rickshaw"
          />
        </div>

        <div className="flex bg-yellow-50 border border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition duration-300 rounded-2xl justify-between p-6 items-center">
          <div className="text-left">
            <h3 className="font-extrabold text-xl text-gray-900 mb-1">Two Wheeler</h3>
            <p className="text-xs text-gray-600 mb-4">
              Fast single-rider bike rides, avoid traffic.
            </p>
            <Link
              to="/to-chooseride"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold py-2 px-4 rounded-xl shadow-sm"
            >
              Book Bike
            </Link>
          </div>
          <img
            className="h-24 w-24 object-contain transform hover:scale-105 transition-transform"
            src="/images/ride.png"
            alt="Bike"
          />
        </div>

        <div className="flex bg-yellow-50 border border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition duration-300 rounded-2xl justify-between p-6 items-center">
          <div className="text-left">
            <h3 className="font-extrabold text-xl text-gray-900 mb-1">Taxi / Cab</h3>
            <p className="text-xs text-gray-600 mb-4">
              Comfortable travel for families & long distances.
            </p>
            <Link
              to="/to-chooseride"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold py-2 px-4 rounded-xl shadow-sm"
            >
              Book Cab
            </Link>
          </div>
          <img
            className="h-24 w-24 object-contain transform hover:scale-105 transition-transform"
            src="/images/sedan.png"
            alt="Cab"
          />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
