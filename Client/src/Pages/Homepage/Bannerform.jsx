import { motion } from "framer-motion";

const Bannerform = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 3 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg mx-5 sm:mx-auto lg:mx-20 max-w-md  w-full"
      >
        <h1 className="text-4xl font-bold mb-8">
          Go anywhere with Valan<span className="text-yellow-300">Pulse</span>
        </h1>

        <div className="flex space-x-4 mb-6">
          <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-100">
            <div className="h-5 w-5" />
            <span>Ride</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2">
            <package2 className="h-5 w-5" />
            <span>Package</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
            <input placeholder="Pickup location" className="pl-8 bg-gray-100" />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 border-2 border-black rounded-full"></div>
            <input
              placeholder="Dropoff location"
              className="pl-8 bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="w-full">Today</button>
            <button className="w-full">Now</button>
          </div>

          <button className="w-full bg-yellow-400 h-[50px] text-black rounded-lg hover:bg-gray-900">
            See prices
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Bannerform;
