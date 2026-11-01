import { Link } from "react-router-dom";

const Drivehompage = () => {
  return (
    <div className="container mx-auto px-4 lg:px-10">
      <div className="drivesection my-14 flex flex-col-reverse lg:flex-row gap-8 items-center justify-center">
        <img
          className="z-10 transform hover:scale-105 transition-transform duration-300 rounded-2xl max-w-md w-full shadow-lg"
          src="/images/car.jpg"
          alt="Driver with Auto"
        />
        <div className="drive-text max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
            Drive when you want, <br /> make what you need
          </h2>
          <p className="my-5 text-gray-600 text-base">
            Earn on your own schedule with auto rickshaw or cab rides across Valanchery. Join as an independent driver partner with fast onboarding.
          </p>
          <div className="flex flex-wrap items-center gap-4 my-3">
            <Link
              to="/to-driver"
              className="bg-yellow-400 text-black hover:bg-black hover:text-white font-bold px-6 py-3 text-base rounded-full shadow-md transition duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/to-dashboard"
              className="text-gray-700 hover:text-black font-semibold text-sm underline"
            >
              Open Driver Dashboard &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drivehompage;
