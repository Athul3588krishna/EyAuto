import { Link } from "react-router-dom";

const Rentcar = () => {
  return (
    <div className="container mx-auto px-4 lg:px-10">
      <div className="rentcar my-12 flex flex-col-reverse lg:flex-row gap-8 items-center justify-center">
        <img
          className="rounded-2xl max-w-md w-full shadow-lg z-10 transform hover:scale-105 transition-transform duration-300"
          src="/images/rent.jpg"
          alt="Rent an Auto"
        />
        <div className="drive-text max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
            Rent or Drive with Fleet Partners
          </h2>
          <p className="my-5 text-gray-600 text-base">
            Don&apos;t own an auto? Connect with verified fleet partners in Valanchery. Start driving and earning on your own terms with EyAuto.
          </p>
          <div className="flex flex-wrap items-center gap-4 my-3">
            <Link
              to="/to-driver"
              className="bg-yellow-400 text-black hover:bg-black hover:text-white font-bold px-6 py-3 text-base rounded-full shadow-md transition duration-200"
            >
              Sign Up as Driver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentcar;
