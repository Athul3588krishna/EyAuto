const Valanbusiness = () => {
  return (
    <div className="container my-6 mx-5 flex  lg:mx-10">
      <div className="business  lg:my-6 flex flex-col lg:flex-row gap-6 ">
        <div className="business-text lg:my-32 lg:mx-24">
          <h1 className="text-4xl">The Valan you</h1>
          <h1 className="text-4xl">know, remained</h1>
          <h1 className="text-4xl">for business</h1>
          <p className="my-6">
            Valan for Business is a platform for managing global rides and{" "}
            <br />
            meals, and local deliveries, for companies of any size
          </p>
          <div className="flex gap-2 lg:gap-4">
          <button className=" bg-yellow-300 text-black border-gray-900  hover:bg-gray-900 hover:text-white font-semibold px-5 py-3 text-lg rounded-full">
            Get started
          </button>
          <p className="my-3 mx-6">Check out our solutions</p></div>
        </div>
        <div className="business-img">
          <img
            className="h-[300px] w-[500px] rounded-lg lg:my-28"
            src="../images/business.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Valanbusiness;
