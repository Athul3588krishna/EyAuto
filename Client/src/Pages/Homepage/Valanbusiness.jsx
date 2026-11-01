import { Link } from "react-router-dom";

const Valanbusiness = () => {
  return (
    <div className="container mx-auto px-4 lg:px-10 my-10">
      <div className="business flex flex-col lg:flex-row gap-8 items-center justify-center">
        <div className="business-text max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
            EyAuto for Local Commerce & Businesses
          </h2>
          <p className="my-5 text-gray-600 text-base">
            Reliable on-demand transport for local businesses, shops, and commuters across Valanchery. Move goods, parcel packages, and send employees with trusted drivers.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/to-chooseride"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 text-base rounded-full shadow-md transition duration-200"
            >
              Book Corporate Ride
            </Link>
          </div>
        </div>
        <div className="business-img max-w-md w-full">
          <img
            className="rounded-2xl shadow-lg w-full object-cover"
            src="/images/business.jpg"
            alt="Business Rides"
          />
        </div>
      </div>
    </div>
  );
};

export default Valanbusiness;
