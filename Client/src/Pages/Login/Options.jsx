import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Options = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Welcome to Ey<span className="text-yellow-500">Auto</span>
          </h1>
          <p className="text-gray-500 text-base mt-2">
            Select your account type to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Driver Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-transparent hover:border-yellow-400 transition-all p-6 flex flex-col justify-between">
            <div>
              <div className="h-52 bg-yellow-50 rounded-xl flex items-center justify-center overflow-hidden mb-5">
                <img
                  className="h-44 object-contain"
                  src="/images/driver.png"
                  alt="Drive with EyAuto"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Drive & Earn
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Register your auto rickshaw or vehicle. Start taking rides and make daily income in Valanchery.
              </p>
            </div>
            <Link
              to="/to-driver"
              className="w-full bg-black hover:bg-yellow-400 hover:text-black text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2"
            >
              <span>Driver Registration</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Rider Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-transparent hover:border-yellow-400 transition-all p-6 flex flex-col justify-between">
            <div>
              <div className="h-52 bg-yellow-50 rounded-xl flex items-center justify-center overflow-hidden mb-5">
                <img
                  className="h-44 object-contain"
                  src="/images/auto.png"
                  alt="Book an Auto"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ride with EyAuto
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Book autos instantly, view transparent fares, and track routes on OpenStreetMap.
              </p>
            </div>
            <Link
              to="/to-rider"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md"
            >
              <span>Rider Sign In / Sign Up</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Options;
